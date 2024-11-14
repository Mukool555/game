import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { animated } from '@react-spring/three';

const Leaf = ({ position }) => {
  const { nodes } = useGLTF('/assets/leaf.glb'); // Load your 3D leaf model (GLTF format)
  const [hovered, setHovered] = useState(false);
  
  return (
    <animated.mesh
      geometry={nodes.Leaf.geometry}
      position={position}
      scale={hovered ? 1.2 : 1}
      onClick={() => console.log('Leaf clicked')}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial color={hovered ? 'green' : 'darkgreen'} />
    </animated.mesh>
  );
};

export default Leaf;
