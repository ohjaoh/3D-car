import { useRecoilValue } from "recoil";
import { stage2 } from "../utils/atom";
import { useBox } from "@react-three/cannon";
import { useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";

const colors = ["#0802A3", "#FF4B91", "#FFCD4B", "#FF7676", "#445D48"];
const MAX_BOX_COUNT = 200;

export function BoxDrop() {
  const flood = useRecoilValue(stage2);
  const [boxs, setBoxs] = useState([]);

  const generateRandomBox = () => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const x = -6 - Math.random() * 5;
    const y = 5 + Math.random() * 5;
    const z = -4 + Math.random() * 5;
    // 객체로 반환해서 { 이거인듯 }
    return {
      color: randomColor,
      position: [x, y, z],
      args: [0.2, Math.random() * 1.7, 0.2],
    };
  };

  const addRandomBox = () => {
    if (boxs.length < MAX_BOX_COUNT) {
      setBoxs((currBoxs) => [...currBoxs, generateRandomBox()]);
    }
  };

  useEffect(() => {
    if (flood) {
      addRandomBox();
    }
  }, [flood]);

  useFrame(({ clock }) => {
    // (_, delta)이게 위에 들어가고
    //  console.log("delta", delta * 10); // delta를 이용해서 시간값을 이용했음
    // console.log(clock.getElapsedTime) // 시간의 경과를 보여줌
    const elapsedTime = Math.floor(clock.getElapsedTime());
    if (flood && elapsedTime % 5 === 0) {
      addRandomBox();
    }
  });

  return boxs.map((boxInfo, i) => <Box key={i} {...boxInfo} />);
}

function Box({ args, color, position = [0, 1, 0] }) {
  const [ref] = useBox(() => ({
    mass: 1,
    args: args,
    position: position,
    type: "Dynamic",
  }));

  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
