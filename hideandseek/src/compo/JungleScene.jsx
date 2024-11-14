// components/JungleScene.jsx
import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Plane, useTexture } from '@react-three/drei';
import { useSpring, a } from 'react-spring';
import * as THREE from 'three';
import Leaf from './Leaf';
import Person from './Person';

const JungleScene = () => {
  const [leafPosition, setLeafPosition] = useState([2, 0, 0]);
  const { position } = useSpring({ position: leafPosition, config: { tension: 200, friction: 30 } });

  // Remove console.logs used for debugging

  // Create a Background component to properly handle texture loading
  const Background = () => {
    const texture = useTexture('/assets/jungle.jpg');
    return (
      <Plane args={[20, 20]} position={[0, 0, -10]}>
        <meshBasicMaterial map={texture} />
      </Plane>
    );
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}> {/* Add container with dimensions */}
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />

        {/* Background Jungle Image */}
        <Background />

        {/* Leaves (movable 3D objects) */}
        <Leaf position={[0, 1, 0]} />
        <a.group position={position}>
          <Leaf position={[2, 0, 0]} />
        </a.group>

        {/* Person (hidden behind the leaves) */}
        <Person position={[0, 0, 1]} />

        {/* Controls to move the camera */}
        <OrbitControls />
      </Canvas>
    </div>
  );
};

export default JungleScene;
