import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
        { name: "jump", keys: ["Space"] },
      ]}
    >
      {<Leva hidden />}

      <Canvas
        // flat
        camera={{
          fov: 45,
          near: 0.1,
          far: 200,
          position: [0, 10, 30],
        }}
      >
        <OrbitControls />
        <Physics debug={false}>
          <App />
        </Physics>
      </Canvas>
    </KeyboardControls>
  </React.StrictMode>
);
