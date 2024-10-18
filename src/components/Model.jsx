import { useEffect, useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useGLTF, PresentationControls, Float } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import particlesVertexShader from '../assets/shaders/particles/vertex.glsl'
import particlesFragmentShader from '../assets/shaders/particles/fragment.glsl'
import wobbleVertexShader from '../assets/shaders/wobble/vertex.glsl'
import wobbleFragmentShader from '../assets/shaders/wobble/fragment.glsl'
import gsap from "gsap"
import useGame from "../stores/useGame.jsx"
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import { useFrame } from "@react-three/fiber"



export default function Model()
{
    const particles = useRef()
    const cells = useRef()
    const firstUpdate = useRef(true)
    const { camera } = useThree()
    const page = useGame((state) => state.page)
    const [ rot, setRot ] = useState(.5)
    const [sizes, setSizes] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: Math.min(window.devicePixelRatio, 2)
    })
    const dna = useGLTF('models/dna.glb', true, (loader) =>
    {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')
        loader.setDRACOLoader(dracoLoader)
    })
    const cell = useGLTF('models/cells.glb', true, (loader) =>
        {
            const dracoLoader = new DRACOLoader()
            dracoLoader.setDecoderPath('/draco/')
            loader.setDRACOLoader(dracoLoader)
        })
    const [cellsGeometries, setCellsGeometries] = useState([]) 

    const [colors] = useState({
        colorA: [new THREE.Color('#ff004d'), new THREE.Color('#b76cfd'), new THREE.Color('#11808c')],
        colorB: [new THREE.Color('#faef5d'), new THREE.Color('#ff2281'), new THREE.Color('#de4959')],
        colorC: [new THREE.Color('#613659'), new THREE.Color('#175873'), new THREE.Color('#57330b')],
        colorD: [new THREE.Color('#7e2553'), new THREE.Color('#0C1446'), new THREE.Color('#388322')]
    })

    function morph(index)
    {
        
        particles.current.geometry.attributes.position = particles.current.positions[particles.current.index]
        particles.current.geometry.attributes.aPositionTarget = particles.current.positions[index]
        if(index == 1)
        {
            setRot(0)
            const balance = particles.current.rotation.y - particles.current.rotation.y % (Math.PI * 2)
            gsap.to(particles.current.rotation, { y: balance, duration: 1.5, ease: 'liner' })
        }
        else
            setRot(.5)
        
        gsap.fromTo(
            particles.current.material.uniforms.uProgress,
            { value: 0 },
            { value: 1, duration: 3, ease: 'liner' }
        )
        gsap.to(
            particles.current.material.uniforms.uColorA.value,
            { r: colors.colorA[index].r, g: colors.colorA[index].g, b: colors.colorA[index].b, duration: 3, ease: 'liner' }
        )
        gsap.to(
            particles.current.material.uniforms.uColorB.value,
            { r: colors.colorB[index].r, g: colors.colorB[index].g, b: colors.colorB[index].b, duration: 3, ease: 'liner' }
        )
        particles.current.index = index
        

        var tl = gsap.timeline()
        tl.to(cells.current.material.uniforms.uOpacity, { value: 0, duration: 1, ease: 'liner' },0)
        tl.to(cells.current.material.uniforms.uOpacity, { value: 1, duration: 1, ease: 'liner' }, 1.5)
        setTimeout(() => 
        {
            cells.current.geometry = cellsGeometries[index]
            cells.current.material.uniforms.uColorA.value = colors.colorC[index]
            cells.current.material.uniforms.uColorB.value = colors.colorD[index]
        },[1000])
    }

    useLayoutEffect(() =>
    {
            
            particles.current.index = 0
            
            const positions = dna.scene.children.map(child => child.geometry.attributes.position)
            particles.current.maxCount = 0
            for(const position of positions)
            {
                if(position.count > particles.current.maxCount)
                    particles.current.maxCount = position.count
            }

            particles.current.positions = []
            for(const position of positions)
            {
                const originalArray = position.array
                const newArray = new Float32Array(particles.current.maxCount * 3)

                for(let i=0; i<particles.current.maxCount; i++)
                {
                    const i3 = i * 3

                    if(i3 < originalArray.length)
                    {
                        newArray[i3 + 0] = originalArray[i3 + 0]
                        newArray[i3 + 1] = originalArray[i3 + 1]
                        newArray[i3 + 2] = originalArray[i3 + 2]
                    }
                    else
                    {
                        const randomIndex = Math.floor(position.count * Math.random()) * 3
                        newArray[i3 + 0] = originalArray[randomIndex + 0]
                        newArray[i3 + 1] = originalArray[randomIndex + 1]
                        newArray[i3 + 2] = originalArray[randomIndex + 2]
                    }
                }
                particles.current.positions.push(new THREE.Float32BufferAttribute(newArray, 3))
            }
            
            

            const sizesArray = new Float32Array(particles.current.maxCount)

            for(let i=0; i<particles.current.maxCount; i++)
                sizesArray[i] = Math.random()

            particles.current.geometry = new THREE.BufferGeometry()
            particles.current.geometry.setAttribute('position', particles.current.positions[particles.current.index])
            // particles.current.geometry.setAttribute('aPositionTarget', particles.current.positions[3])
            particles.current.geometry.setAttribute('aSize', new THREE.BufferAttribute(sizesArray, 1))

            particles.current.material = new THREE.ShaderMaterial({
                vertexShader: particlesVertexShader,
                fragmentShader: particlesFragmentShader,
                uniforms:
                {
                    uSize: new THREE.Uniform(0.2),
                    uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
                    uProgress: new THREE.Uniform(0),
                    uColorA : new THREE.Uniform(new THREE.Color('#ff004d')),
                    uColorB : new THREE.Uniform(new THREE.Color('#faef5d')),
                    uTime: new THREE.Uniform(0)
                },
                blending: THREE.AdditiveBlending,
                depthWrite: false
            })

            // Points
            particles.current.points = new THREE.Points(particles.current.geometry, particles.current.material)
            particles.current.points.frustumCulled = false


            // Cells
            setCellsGeometries(cell.scene.children.map(child => child.geometry))
            cells.current.geometry = cell.scene.children[0].geometry

            const cellsUniforms = {
                uTime: new THREE.Uniform(0),
                uPositionFrequency: new THREE.Uniform(0.5),
                uTimeFrequency: new THREE.Uniform(0.2),
                uStrength: new THREE.Uniform(0.8),

                uWarpPositionFrequency: new THREE.Uniform(0.38),
                uWarpTimeFrequency: new THREE.Uniform(0.12),
                uWarpStrength: new THREE.Uniform(1.7),

                uOpacity: new THREE.Uniform(1.0),
                
                uColorA: new THREE.Uniform(new THREE.Color('#613659')),
                uColorB: new THREE.Uniform(new THREE.Color('#7e2553'))
            }

            cells.current.material = new CustomShaderMaterial({
                baseMaterial: THREE.MeshPhysicalMaterial,
                vertexShader: wobbleVertexShader,
                fragmentShader: wobbleFragmentShader,
                uniforms: cellsUniforms,
                silent: true,

                metalness: 0,
                roughness: 0.5,
                color: '#ffffff',
                transmission: 0,
                ior: 1.5,
                thickness: 1.5,
                transparent: true,
                wireframe: true
            })
            
            cells.current.customDepthMaterial = new CustomShaderMaterial({
                baseMaterial: THREE.MeshDepthMaterial,
                vertexShader: wobbleVertexShader,
                uniforms: cellsUniforms,
                silent: true,

                depthPacking: THREE.RGBADepthPacking
            })
            
    },[])
    
    useEffect(() =>
    {
        if(firstUpdate.current)
            firstUpdate.current = false
        else
            morph(page)
    }, [page])
    

    useFrame((state, delta) =>
    {
        particles.current.material.uniforms.uTime.value += delta
        particles.current.rotation.y += delta * rot
        cells.current.material.uniforms.uTime.value += delta
        cells.current.customDepthMaterial.uniforms.uTime.value += delta
    })
    

    // useEffect(())
    

    window.addEventListener('resize', () =>
    {
        setSizes({
            width: window.innerWidth,
            height: window.innerWidth,
            pixelRatio: Math.min(window.devicePixelRatio, 2)
        })
        
        if(window.innerWidth < 800)
            camera.position.z = 16 + 800 / window.innerWidth * 5
        else
            camera.position.z = 16
    })
    

    return<>
        <PresentationControls 
            global
            rotation={[ 0.13, 0.1, 0 ]}
            polar={[ -.8, .5 ]}
            azimuth={[ -1., 1. ]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
        >
        <ambientLight intensity={3} />
            <Float rotationIntensity={ 0.4 }>
                <points ref={particles} rotation={[-.2,.1, 0]} scale={.8} />
                <mesh ref={cells} rotation={[-.2,.1, 0]} scale={.8} >
                </mesh>
            </Float>
        </PresentationControls>

        
    </>
}