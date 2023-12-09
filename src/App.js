import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Text,
  //PresentationControls,
} from "@react-three/drei";
import {
  EffectComposer,
  //DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import "./style.css";
import { Ground } from "./Ground";
import { Car } from "./Car";
import { FloatingGrid } from "./FloatingGrid";
//import { TopSection } from "./TopSection";

function CarShow() {
  return (
    <>
      <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />

      <PerspectiveCamera makeDefault position={[3, 2, 5]} fov={50} />

      <color args={[0, 0, 0]} attach="background" />

      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <Car />
          </>
        )}
      </CubeCamera>

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={750}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={1000}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={1000}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 5]}
        castShadow
        shadow-bias={-0.0001}
      />

      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={750}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, -5]}
        castShadow
        shadow-bias={-0.0001}
      />

      <Ground />
      <FloatingGrid />

      <EffectComposer>
        {/*<DepthOfField
          focusDistance={0.0035}
          focalLength={0.01}
          bokehScale={3}
          height={480}
        />*/}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.02} // The bloom intensity.
          width={400} // render width
          height={400} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.019} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>
    </>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />

        <Text
          color="#fff"
          fontSize={0.2}
          maxWidth={1}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwOIpWqZPBQ.ttf"
          anchorX="end"
          anchorY="middle"
          position={[1, 1.5, 0]}
          rotation={[0, Math.PI * 0.1, 0]}
        >
          Corvette: {"\n"} Based on "Chevrolet Corvette (C7)"
        </Text>
      </Canvas>
    </Suspense>
  );
}

export default App;
