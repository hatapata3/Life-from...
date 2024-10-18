import 'remixicon/fonts/remixicon.css'
import './body.css'
import { lazy, Suspense, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Canvas } from '@react-three/fiber'
import gsap from 'gsap'
import 'swiper/css'
import useGame from '../stores/useGame.jsx'
import img1 from '../assets/img/img1.jpg'
import img2 from '../assets/img/img2.jpg'
import img3 from '../assets/img/img3.jpg'

const Model = lazy(() => retry(() => import('./model.jsx')))

function retry(fn, retriesLeft = 5, interval = 1000) {
    return new Promise((resolve, reject) => {
        fn()
        .then(resolve)
        .catch((error) => {
            setTimeout(() => {
                if (retriesLeft === 1) {
                // reject('maximum retries exceeded');
                reject(error);
                return;
                }
            // Passing on "reject" is the important part
                retry(fn, retriesLeft - 1, interval).then(resolve, reject);
            }, interval);
        });
    });
}

export default function Body()
{
    const setPage = useGame((state) => state.setPage)
    const imgRef = useRef()

    const [images] = useState([
        img1, img2, img3
    ])

    function changePage(page)
    {
        setPage(page)
        var tl = gsap.timeline()
        
        tl.to(imgRef.current, {opacity: 0, duration: .5, ease: 'liner'}, 0)
        tl.to(imgRef.current, {opacity: .4, duration: 1, ease: 'liner'}, 1.5)
        setTimeout(() =>
        {
            imgRef.current.src = images[page]
        }, [1500])
    }

    return (
        <>
            <main className="main">
                <section className="home">
                    <img ref={imgRef} src={img1} alt="image" className='home__img' />

                    <Swiper
                        className="home__swiper"
                        modules = {[Navigation, Pagination]}
                        loop = {true}
                        speed = {1800}
                        parallax = {true}
                        effect = 'fade'
                        pagination = {{
                            el: '.swiper-pagination',
                            type: 'fraction',
                            formatFractionCurrent: (number) => { return '0' + number },
                            formatFractionTotal: (number) => { return '0' + number }

                        }}
                        navigation ={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next'
                        }}
                        onSlideChangeTransitionStart={(swiper) => {changePage(swiper.realIndex)}
                        }
                    >
                        <SwiperSlide className="home__article">
                            <div className="home__data container">
                                <h1 className="home__title">Life from Space</h1>
                                <h3 className="home__subtitle">The Panspermia Hypothesis suggests that life came to Earth from space, carried by comets or asteroids that delivered organic molecules or microbes to our planet.</h3>

                                <a href="#" className="home__button">
                                    Learn more <i className="ri-arrow-right-s-line"></i>
                                </a>
                            </div>
                            <div className="home__shadow"></div>
                        </SwiperSlide>

                        <SwiperSlide className="home__article">
                            <div className="home__data container">
                                <h1 className="home__title">Life from the Ocean's Depths</h1>
                                <h3 className="home__subtitle">The Hydrothermal Vent Hypothesis proposes that life originated around deep-sea hydrothermal vents, where superheated, mineral-rich water provided the energy needed to fuel the first simple life forms.</h3>

                                <a href="#" className="home__button">
                                    Learn more <i className="ri-arrow-right-s-line"></i>
                                </a>
                            </div>
                            <div className="home__shadow"></div>
                        </SwiperSlide>

                        <SwiperSlide className="home__article">
                            <div className="home__data container">
                                <h1 className="home__title">Life from Earth's Early Oceans</h1>
                                <h3 className="home__subtitle">The Primordial Soup Hypothesis suggests that life began in Earth's early oceans, where volcanic gases and lightning sparked the formation of organic molecules, creating a "soup" that led to the first life forms.</h3>

                                <a href="#" className="home__button">
                                    Learn more <i className="ri-arrow-right-s-line"></i>
                                </a>
                            </div>
                            <div className="home__shadow"></div>
                        </SwiperSlide>

                    </Swiper>

                    <div className="home__content">
                        <div className="home__social">
                            <a href="https://www.facebook.com/" target='_blank' className="home__social-link">
                                <i className="ri-facebook-circle-line"></i>
                            </a>
                            <a href="https://www.instagram.com/" target='_blank' className="home__social-link">
                                <i className="ri-instagram-line"></i>
                            </a>
                            <a href="https://twitter.com/" target='_blank' className="home__social-link">
                                <i className="ri-twitter-x-line"></i>
                            </a>
                        </div>
                        <div id='pagination' className="swiper-pagination"></div>

                        <div className="swiper-navigation">
                            <div className="swiper-button-prev">
                                <i className="ri-arrow-left-s-line"></i>
                            </div>
                            <div className="swiper-button-next">
                                <i className="ri-arrow-right-s-line"></i>
                            </div>
                        </div>
                    </div>
                    <Canvas
                        camera={{
                            fov: 35,
                            near: .1,
                            far: 100,
                            position: [0, 0, 16]
                        }}
                        style={{position: 'absolute', top: 0, left: 0, zIndex: 0, touchAction: 'none'}}
                    >
                        <Suspense fallback={null}>
                            <Model />
                        </Suspense>
                    </Canvas>
                </section>
            </main>
        </>
    )
}