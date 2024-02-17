import React, { useState, useEffect } from "react";
import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import {
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
const titleLetters = ["A1", "L", "I", "R", , "A2", "Z", "A3"];

export const Title = () => {
  const title = useGLTF("/models/title.glb");
  const [titleData, setTitleData] = useState([]);

  const { colliderArgs, titlePosition } = useControls({
    titlePosition: {
      value: [-8, 0.0, 5],
      step: 0.1,
    },
    colliderArgs: {
      value: [0.6, 0.6, 0.6],
      step: 0.1,
    },
  });
  const [hitSound] = useState(() => new Audio("audio/brick-1.mp3"));
  useEffect(() => {
    if (title.nodes) {
      const textMeshes = [];
      for (const key in title.nodes) {
        if (titleLetters.includes(key)) {
          textMeshes.push(title.nodes[key]);
        }
      }
      setTitleData((prev) => {
        return textMeshes.map((mesh) => {
          return {
            position: [mesh.position.x, mesh.position.y, mesh.position.z],
            scale: [mesh.scale.x, mesh.scale.y, mesh.scale.z],
            material: mesh.material,
            geometry: mesh.geometry,
            rotation: mesh.rotation,
            // children: mesh.children,
          };
        });
      });
    }
  }, []);
  const handleCollision = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  };

  return (
    <>
      <group position={titlePosition}>
        {titleData.length
          ? titleData.map((box, index) => (
              <RigidBody
                type="dynamic"
                position={box.position}
                restitution={0}
                friction={0.5}
                onCollisionEnter={handleCollision}
                // linearDamping={10}
                // angularDamping={10}
                colliders={false}
                key={
                  box.position[0] +
                  box.position[1] +
                  box.position[2] +
                  Math.random()
                }
              >
                <mesh
                  scale={box.scale}
                  geometry={box.geometry}
                  material={box.material}
                  rotation={box.rotation}
                ></mesh>

                <CuboidCollider args={colliderArgs} mass={0.001} />
              </RigidBody>
            ))
          : null}
      </group>
    </>
  );
};
