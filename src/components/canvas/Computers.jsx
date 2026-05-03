/* eslint-disable react/no-unknown-property */
import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import PropTypes from "prop-types";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF('./desktop_pc/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <pointLight intensity={1} />
      <spotLight
        position={[-6, 4, 1]}
        angle={2}
        penumbra={1}
        intensity={250}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.4 : 0.6} // Smaller scale for mobile
        position={isMobile ? [0, -2.7, -0.7] : [0, -2.5, -1]}
        rotation={[0.007, -0.3, -0.1]}
      />
    </mesh>
  )
}

// Add prop-types validation
Computers.propTypes = {
  isMobile: PropTypes.bool.isRequired,
}

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')

    setIsMobile(mediaQuery.matches)

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches)
    }

    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{
        position: isMobile ? [20, 3, 5] : [20, 3, 5],
        fov: isMobile ? 35 : 25
      }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}

export default ComputersCanvas;