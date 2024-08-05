import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Debug, Physics } from "@react-three/cannon";
import Car from "./Car";
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
        {/* args={[bgValue.bgColor]} */}
        <Physics gravity={[0, -2.6, 0]}>
          {/* gravity={[gravity.x, gravity.y, gravity.z]} */}
          <Debug>
            <Car />
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
