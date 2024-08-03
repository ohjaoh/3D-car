import { Canvas } from "@react-three/fiber";
import { Box } from "./Box";
import { Ground } from "./Ground";
import { Debug, Physics } from "@react-three/cannon";
import { useControls } from "leva";
import { Sphere } from "./shpere";
import { Cylinder } from "./Cylinder";
import { Torus } from "./Torus";
import { Icosahedron } from "./Ijcosahedron";
import Car from "./Car";
import DummyMovementArea from "./dummy/DummyMovementArea";
import DummyBox from "./dummy/DummyBox";
import DummyBall from "./dummy/DummyBall";
import DummyWall from "./dummy/Dummywall";
function Scene() {
  // const bgValue = useControls({ bgColor: "#fff" });

  // const gravity = useControls("Gravity", {
  //   x: { value: 0, min: -10, max: 10, step: 0.1 },
  //   y: { value: -9.81, min: -10, max: 10, step: 0.1 },
  //   z: { value: 0, min: -10, max: 10, step: 0.1 },
  // });

  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 5] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        <color attach={"background"} />
        {/* args={[bgValue.bgColor]} */}
        <Physics gravity={[0, -2.6, 0]}>
          {/* gravity={[gravity.x, gravity.y, gravity.z]} */}
          <Debug>
            <Car />
            <DummyBall position={[0, 0.2, -2]} args={[0.15]} />
            <DummyBox position={[1, 0.2, -2]} args={[0.2, 0.2, 0.2]} />
            <DummyBox position={[1, 0.2, 1]} args={[0.2, 0.5, 0.2]} type={"Static"}/>
            <DummyWall position={[5,0.5,0]} args={[1,1,10]}/>
            <DummyWall position={[0,0.5,5]} args={[10,1,1]}/>
            <DummyWall position={[0,0.5,-5]} args={[10,1,1]}/>
            <DummyWall position={[-5,0.5,0]} args={[1,1,10]}/>
            {/* <DummyMovementArea position={[0, -0.2, 0]} /> */}
            {/* <Box position={[0, 1, 0]} />
            <Sphere position={[2, 1, 0]} />
            <Cylinder position={[-2, 1, 0]} />
            <Torus position={[-1, 1, 2]} />
            <Icosahedron position={[1,1,2]}/> */}
            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Debug>
        </Physics>
      </Canvas>
    </>
  );
}

export default Scene;
