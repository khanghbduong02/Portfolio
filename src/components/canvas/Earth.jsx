/* eslint-disable react/no-unknown-property */
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { useReducedMotion } from 'framer-motion'

import CanvasLoader from "../Loader"

const Earth = () => {
  const earth = useGLTF('./planet/scene.gltf')

  return (
    <primitive
      object={earth.scene}
      scale={2.5}
      position-y={0}
      rotation-y={0}
    />
  )
}

const EarthCanvas = () => {
  const reducedMotion = useReducedMotion()

  return (
    <Canvas
      shadows
      frameloop={reducedMotion ? 'demand' : 'always'}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6]
      }}
      className='justify-center'
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate={!reducedMotion}
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Earth />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}

export default EarthCanvas