import "./App.css";
import Boxes from "./components/Boxes";
import Floor from "./components/Floor";
import Lights from "./components/Lights";
import Player from "./components/Player";
import Title from "./components/Title";
import { useControls } from "leva";
function App() {
  const { background } = useControls({
    background: "#5496d5",
  });

  return (
    <>
      <color args={[background]} attach="background" />
      <Lights />
      <Floor />
      <Player />
      <Title />
      <Boxes />
    </>
  );
}

export default App;
