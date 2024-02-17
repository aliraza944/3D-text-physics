import { useState, useEffect, useRef } from "react";
import { useRapier, RigidBody, BallCollider } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
export const Player = () => {
  const ball = useGLTF("/models/bowling_ball.glb");

  const { playerPosition, playerColor } = useControls({
    playerPosition: {
      value: [-11, 2, 18],
      step: 0.1,
    },
    playerColor: "#5929ba",
  });

  const [smoothedCameraPosition] = useState(
    () => new THREE.Vector3(10, 10, 10)
  );
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());
  const body = useRef();
  const { rapier, world } = useRapier();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  useFrame((state, delta) => {
    const keys = getKeys();
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 50 * delta;
    const torqueStrength = 42 * delta;
    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }
    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (!body.current) return;

    body.current.applyImpulse(impulse);
    body.current.applyTorqueImpulse(torque);

    /**
     *  Camera
     */
    const bodyPosition = body.current.translation();

    const cameraPosition = new THREE.Vector3();
    cameraPosition.copy(bodyPosition);
    cameraPosition.z += 15.25;
    cameraPosition.y += 15.0;

    const cameraTarget = new THREE.Vector3();
    cameraTarget.copy(bodyPosition);
    // cameraTarget.y += ;
    smoothedCameraPosition.lerp(cameraPosition, 2 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 2 * delta);
    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
  });
  const jump = () => {
    const origin = body.current.translation();
    origin.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };

    const ray = new rapier.Ray(origin, direction);
    const hit = world.castRay(ray, 10, true);

    if (hit.toi < 0.15) {
      body.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
    }
  };

  useEffect(() => {
    const unSubscribedJump = subscribeKeys(
      (state) => state.jump,
      (value) => {
        if (value) jump();
      }
    );

    return () => {
      unSubscribedJump();
    };
  }, []);
  return (
    <RigidBody
      type="dynamic"
      ref={body}
      position={playerPosition}
      restitution={0.2}
      friction={1}
      linearDamping={0.5}
      angularDamping={0.5}
      canSleep={false}
      colliders={false}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial flatShading color={playerColor} />
      </mesh>
      {/* <primitive object={ball.scene} scale={5} /> */}
      <BallCollider args={[1]} mass={10} />
    </RigidBody>
  );
};
