import React, { useEffect } from "react";
import { usePlane } from "@react-three/cannon";
import { Tree } from "./components/Tree";
import { Ball } from "./components/ball";
import HowToPlay from "./components/HowToPlay";
import { RoadSign } from "./components/RoadSign";
import Banner from "./components/Banner";
import { MotionStage } from "./components/MotionStage";
import { MotionStage2 } from "./components/MotionStage2";
import { Road } from "./components/Road";
import AllTree from "./components/AllTree";

export function Ground() {
  const [meshRef] = usePlane(() => ({
    args: [15, 15],
    mass: 1,
    type: "Static",
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <group>
      <mesh ref={meshRef} receiveShadow>
        <planeGeometry args={[15, 15]} />
        <meshStandardMaterial color="black" wireframe />
      </mesh>
      {/* 나무 */}
      <AllTree />
      {/* 나무 있으면 60 없으면 54 나무 +5개 추가 69 */}
      {/* <Tree position={[1, 0.5, -1]} />
      <Tree position={[-1, 0.5, -1]} />
      <Tree position={[3, 0.5, -1]} />
      <Tree position={[-3, 0.5, -1]} />
      <Tree position={[-6, 0.5, 0]} />
      <Tree position={[-6, 0.5, -2]} />
      <Tree position={[-6, 0.5, -4]} />
      <Tree position={[-6, 0.5, -6]} />
      <Tree position={[-6, 0.5, -8]} />
      <Tree position={[-6, 0.5, -10]} /> */}

      <Ball position={[0, 0.2, -2]} />

      {/* <DummyBall position={[0, 0.2, -2]} args={[0.15]} /> */}
      {/* <DummyBox position={[1, 0.2, -2]} args={[0.2, 0.2, 0.2]} /> */}
      {/* <DummyBox position={[1, 0.2, 1]} args={[0.2, 0.5, 0.2]} type={"Static"} /> */}
      {/* <DummyWall position={[5, 0.5, 0]} args={[1, 1, 10]} />
      <DummyWall position={[0, 0.5, 5]} args={[10, 1, 1]} />
      <DummyWall position={[0, 0.5, -5]} args={[10, 1, 1]} />
      <DummyWall position={[-5, 0.5, 0]} args={[1, 1, 10]} /> */}

      <HowToPlay />
      <Banner position={[0, 1, -6]} />
      <RoadSign position={[0, 0.5, 3]} />

      <MotionStage position={[3, 0.55, 4]} />
      <MotionStage2 position={[-4, 0.55, 5.5]} />

      <Road position={[-8.8, -0.06, 1]} rotation-y={Math.PI / 2} />
      <Road position={[-8.8, -0.06, -9]} rotation-y={Math.PI / 2} />
    </group>
  );
}
