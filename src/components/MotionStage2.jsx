import React, { useRef } from "react";
import { Html, useGLTF, useTexture } from "@react-three/drei";
import Picture from "./Picture";
import { useBox } from "@react-three/cannon";
import { motion } from "framer-motion-3d";
import { BoxDrop } from "./BoxDrop";

export function MotionStage2({ position }) {
  const { nodes, materials } = useGLTF("/assets/models/popup.glb");
  const texture = useTexture("/assets/images/motion_2.webp");

  const [ref] = useBox(
    () => ({
      args: [1, 1, 0.3],
      position,
      type: "Static",
      rotation: [0, Math.PI / 2, 0],
    }),
    useRef[null]
  );

  const x = position[0];
  const y = position[1];
  const z = position[2];

  return (
    <group>
      <mesh position={[x + 1, y-0.5, z]} rotation={[-Math.PI/2,0,0]}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <group ref={ref} scale={0.3}>
        <mesh
          geometry={nodes.body.geometry}
          material={materials.Material}
          position={[0.004, 0.15, 0.065]}
          scale={[1.957, -1.036, 0.135]}
        />
        <Picture nodes={nodes} texture={texture} />
      </group>
      <BoxDrop/>
    </group>
  );
}

useGLTF.preload("/assets/models/popup.glb");
