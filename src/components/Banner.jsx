import { useBox } from "@react-three/cannon";
import { Html, useTexture } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

const Banner = ({ position }) => {
  const texture = useTexture("/assets/images/github_oh.webp");
  const [info, setInfo] = useState(false);

  const [ref] = useBox(
    () => ({
      args: [5, 2, 2],
      position,
      type: "Static",
      onCollide: handleCollission,
    }),
    useRef(null)
  );
  const handleCollission = () => {
    setInfo(true);
  };

  useEffect(() => {
    let timeout;
    if (info) {
      timeout = setTimeout(() => setInfo(false), 1000);
    }
    return () => clearTimeout(timeout);
  });

  const onHandleHistory = () =>{
    const url = 'https://github.com/ohjaoh'
    window.open(url, "_blank")
  }

  return (
    <mesh ref={ref} onClick={onHandleHistory}>
      <boxGeometry args={[5, 2, 2]} />
      <meshStandardMaterial map={texture} />
      {info && (
        <Html center>
          <div className="information">마우스로 클릭 해보세요~</div>
        </Html>
      )}
    </mesh>
  );
};
export default Banner;
