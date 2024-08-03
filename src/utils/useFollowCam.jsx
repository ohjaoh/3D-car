import { useThree } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import { CameraHelper, Object3D } from "three";

const useFollowCam = () => {
  const { scene, camera } = useThree(); //useThree는 캔버스 속에서만 사용할 수 있다. 씬에서 캔버스 외부에서 하면 안된다.
  const pivot = useMemo(() => new Object3D(), []); 
  // 여기서 정점을 메모라이제이션? 해서 여기저기서 사용가능하게 하고

  const makeCamera = () => {
    camera.position.set(1, 2, 3.5);
    camera.rotation.x = -0.5;

    pivot.add(camera)
    // const helper = new CameraHelper (camera);
    // scene.add(helper)
    scene.add(pivot)
  };

  //이 훅이 불리면 makeCamera메서드가 호출되게 한다.
  useEffect(() => {
    makeCamera();
  }, []);

  return { pivot };
};

export default useFollowCam;
