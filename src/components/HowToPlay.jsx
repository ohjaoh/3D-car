import { Text3D } from "@react-three/drei";
import { motion } from "framer-motion-3d";
import { useSetRecoilState } from "recoil";
import { isStartScene } from "../utils/atom";

const HowToPlay = () => {
  const setStart = useSetRecoilState(isStartScene);

  // 폰트를 드레이에서 사용할 때는 확장자가 다 .json이 되어야해서
  // 폰트를 .json으로 변환해주는 툴을 사용할 것
  const fontUrl = "/assets/fonts/Pretendard.json";

  const fontStyle = {
    font: fontUrl,
    size: 0.15,
    letterSpacing: 0.01,
    height: 0.02,
    lineHeight: 1,
    fontSize: 1,
  };
  //   bevelEnabled={true}
  //   bevelOffset={0.0001}
  //   bevelSize={0.001}
  //   bevelThickness={0.1}

  return (
    <motion.group 
      // onUpdate={() => console.log("진행중")}
      // onAnimationStart={() => console.log("시작")}
      onAnimationComplete={() => setStart(true)}
      animate={{ y: [-2, 0], scale: [0, 1] }}
      transition={{ delay: 1.5, duration: 0.3 }}
      position={[0.3, 0, 1]}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      {/* <Text
        font="fontUrl"
        color={"white"}
        characters="abcdefghijklmnopqrstuvwxyz0123456789!"
      >
        hello world
      </Text> */}
      <Text3D {...fontStyle}>
        How to Play
        <meshNormalMaterial />
      </Text3D>
      <group position={[0.3, -0.5, 0]}>
        <Text3D {...fontStyle} position={[0.2, 0.1, 0]}>
          ↑
          <meshNormalMaterial />
        </Text3D>
        <Text3D {...fontStyle} position={[0, -0.1, 0]}>
          ←↓→
          <meshNormalMaterial />
        </Text3D>
      </group>
    </motion.group>
  );
};

export default HowToPlay;
