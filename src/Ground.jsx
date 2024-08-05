import React from "react";
import { usePlane } from "@react-three/cannon";
import DummyBall from "./dummy/DummyBall";
import DummyBox from "./dummy/DummyBox";
import DummyWall from "./dummy/Dummywall";
import { Tree } from "./components/Tree";
import { Ball } from "./components/ball";
import HowToPlay from "./components/HowToPlay";

export function Ground(props) {
  const [meshRef] = usePlane(() => ({
    args: [15, 15],
    mass: 1,
    type: "Static",
    ...props,
  }));

  return (
    <group>
      <mesh {...props} ref={meshRef} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="black" wireframe />
      </mesh>
      {/* 나무 */}
      <Tree position={[1, 0.5, -1]} />
      <Tree position={[-1, 0.5, -1]} />
      <Tree position={[3, 0.5, -1]} />
      <Tree position={[-3, 0.5, -1]} />

      <Ball position={[0, 0.2, -2]}/>

      {/* <DummyBall position={[0, 0.2, -2]} args={[0.15]} /> */}
      {/* <DummyBox position={[1, 0.2, -2]} args={[0.2, 0.2, 0.2]} /> */}
      {/* <DummyBox position={[1, 0.2, 1]} args={[0.2, 0.5, 0.2]} type={"Static"} /> */}
      <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
      <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
      <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
      <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} />

      <HowToPlay/>
    </group>
  );
}
