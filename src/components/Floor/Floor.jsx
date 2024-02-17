import React from "react";
import { useRapier, RigidBody, CuboidCollider } from "@react-three/rapier";
import { useControls } from "leva";

export const Floor = () => {
  const { metalness, roughness, floorColor } = useControls({
    metalness: {
      value: 0.6,
      step: 0.1,
    },
    roughness: {
      value: 0.2,
      step: 0.1,
    },
    floorColor: "#8cb719",
  });
  return (
    <>
      <RigidBody type="fixed" friction={3}>
        <mesh position={[0, 0, 0]} scale={[40, 0.2, 40]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            attach="material"
            color={floorColor}
            metalness={metalness}
            // roughness={roughness}
          />
        </mesh>
      </RigidBody>

      <CuboidCollider args={[20, 2, 0.05]} position={[0, 2, 20]} />
      <CuboidCollider args={[20, 2, 0.05]} position={[0, 2, -20]} />
      <CuboidCollider args={[0.05, 2, 20]} position={[20, 2, 0]} />
      <CuboidCollider args={[0.05, 2, 20]} position={[-20, 2, 0]} />
    </>
  );
};
