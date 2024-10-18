uniform vec3 uColorA;
uniform vec3 uColorB;
uniform float uOpacity;

varying float vWobble;

void main()
{
    float colorMix = smoothstep(-1.0, 1.0, vWobble);
    csm_DiffuseColor.rgb = mix(uColorA, uColorB, colorMix);
    csm_DiffuseColor.a = 0.2 * uOpacity;

    // Mirror step
    csm_Metalness = step(0.25, vWobble);
    csm_Roughness = 1.0 -csm_Metalness;

    // Shinny tip
    csm_Roughness = 1.0 - colorMix;
}