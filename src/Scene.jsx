import { Canvas } from "@react-three/fiber";
import { Ground } from "./Ground";
import { Debug, Physics } from "@react-three/cannon";
import Car from "./Car";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { isStartScene } from "./utils/atom";
import { Stats, StatsGl } from "@react-three/drei";
import DrawCallCounter from "./components/DrawCallCounter";
// import fontjson from "./Pretendard.json";

function Scene() {
  // const bgValue = useControls({ bgColor: "#fff" });

  // const gravity = useControls("Gravity", {
  //   x: { value: 0, min: -10, max: 10, step: 0.1 },
  //   y: { value: -9.81, min: -10, max: 10, step: 0.1 },
  //   z: { value: 0, min: -10, max: 10, step: 0.1 },
  // });

  const isStart = useRecoilValue(isStartScene);

  // useEffect(() => {
  //   const fontData = fontjson;
  //   console.log(fontData);
  //   const targetText = "How to Play↑←↓→";
  //   const modifiedGlyphs = {};

  //   for (let i = 0; i < targetText.length; i++) {
  //     const char = targetText[i];
  //     const charKey = char in fontData.glyphs ? char : char.toUpperCase();

  //     if (charKey in fontData.glyphs) {
  //       modifiedGlyphs[charKey] = fontData.glyphs[charKey];
  //     }
  //   }

  //   const modifiedFontData = {
  //     ...fontData,
  //     glyphs: modifiedGlyphs,
  //   };

  //   console.log(JSON.stringify(modifiedFontData))
  // });

  // useEffect(() => {
  //   console.log(isStart);
  // }, [isStart]);

  return (
    <>
      <Canvas camera={{ fov: 45, position: [1.5, 2, 5] }}>
        <ambientLight />
        <directionalLight position={[0, 5, 5]} />
        {/* args={[bgValue.bgColor]} */}
        <Physics gravity={[0, -2.6, 0]}>
          {/* gravity={[gravity.x, gravity.y, gravity.z]} */}
          <Debug>
            {isStart && <Car />}
            {/* <DummyMovementArea position={[0, -0.2, 0]} /> */}
            {/* <Box position={[0, 1, 0]} />
            <Sphere position={[2, 1, 0]} />
            <Cylinder position={[-2, 1, 0]} />
            <Torus position={[-1, 1, 2]} />
            <Icosahedron position={[1,1,2]}/> */}
            <Ground rotation={[-Math.PI / 2, 0, 0]} />
          </Debug>
        </Physics>
        <DrawCallCounter />
        <StatsGl showPanel={0} className="work" />
      </Canvas>
    </>
  );
}

export default Scene;
