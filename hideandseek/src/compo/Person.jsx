// components/Person.jsx
import React from 'react';

const Person = ({ position }) => {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="pink" />
    </mesh>
  );
};

export default Person;
