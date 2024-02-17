import React, { useEffect, useRef, useMemo, useState } from "react";
import {
  RigidBody,
  CuboidCollider,
  InstancedRigidBodies,
} from "@react-three/rapier";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

export const Boxes = () => {
  const [boxes, setBoxes] = useState([]);
  const { nodes, materials } = useGLTF("/models/box.glb");
  const { brickColors } = useControls({
    brickColors: "#ff0000",
  });
  useEffect(() => {
    if (nodes) {
      for (const key in nodes) {
        if (nodes[key].type === "Mesh") {
          setBoxes((prev) => {
            return [
              ...prev,
              {
                position: [
                  nodes[key].position.x,
                  nodes[key].position.y,
                  nodes[key].position.z,
                ],
                scale: [
                  nodes[key].scale.x,
                  nodes[key].scale.y,
                  nodes[key].scale.z,
                ],
                rotation: [
                  nodes[key].rotation.x,
                  nodes[key].rotation.y,
                  nodes[key].rotation.z,
                ],
                material: nodes[key].material,
                geometry: nodes[key].geometry,
              },
            ];
          });
        }
      }
    }
  }, []);

  return (
    <>
      <group position={[8, 0.2, 0]}>
        {boxes.length
          ? boxes.map((box) => (
              <RigidBody
                type="dynamic"
                position={box.position}
                restitution={0}
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
                <CuboidCollider args={box.scale} mass={0.001} />
              </RigidBody>
            ))
          : null}
      </group>
    </>
  );
};
