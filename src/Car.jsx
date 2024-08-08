import { useControls } from "leva";
import DummyCarBody from "./dummy/DummyCarBody";
import {
  useBox,
  useCompoundBody,
  useRaycastVehicle,
} from "@react-three/cannon";
import { useMemo, useRef } from "react";
import DummyWheel from "./dummy/DummyWheel";
import useWheels from "./utils/useWheels";
import useVehicleControls from "./utils/useVehicleControls";
import { Vector3 } from "three";
import { useFrame } from "@react-three/fiber";
import useFollowCam from "./utils/useFollowCam";
import { CarBody } from "./components/CarBody";
import { Wheel } from "./components/Wheel";
import { useRecoilState, useSetRecoilState } from "recoil";
import { stage1, stage2 } from "./utils/atom";

const Car = () => {
  const { pivot } = useFollowCam();
  const worldPosition = useMemo(() => new Vector3(), []); // 여기서 벡터3로 월드 위치(아마도 자동차의 위치같음)를 메모라이제이션? 하여 전역변수처럼 쓴다.
  const setStage1 = useSetRecoilState(stage1);
  const setStage2 = useSetRecoilState(stage2);
  // const [value] = useRecoilState(stage2); // stage2의 상태 체크용

  // const chassisBodyValue = useControls("chassisBody", {
  //   width: { value: 0.33, min: 0, max: 1 },
  //   height: { value: 0.35, min: 0, max: 1 },
  //   front: { value: 0.23 * 2, min: 0, max: 1 },
  // });

  const position = [0, 0.5, 0];

  let width, height, front, mass, wheelRadius;

  width = 0.16;
  height = 0.12;
  front = 0.17;
  mass = 150;
  wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [chassisBody, chassisApi] = useCompoundBody(
    () => ({
      // args: chassisBodyArgs,
      collisionFilterGroup: 5, // 충돌시 collisionfilter.bodyFilterGroup의 값
      position,
      mass,
      rotation: [0, Math.PI, 0],
      shapes: [
        {
          args: chassisBodyArgs,
          position: [0, 0, 0],
          type: "Box",
        },
        {
          args: [width, height, front],
          position: [0, height, 0],
          type: "Box",
        },
      ],
    }),
    useRef(null)
  );

  const [vehicle, vehicleApi] = useRaycastVehicle(() => ({
    chassisBody,
    wheelInfos,
    wheels,
  }));

  useVehicleControls(vehicleApi, chassisApi);

  const makeFollowCam = () => {
    chassisBody?.current.getWorldPosition(worldPosition);
    // console.log("worldPosition", worldPosition);
    // 밑에lerp가 백터3가 들어오고 알파숫자값이 들어옴 첫 값으로 비교할 벡터
    // 숫자값으로 얼마나 비교할 것인지를 지정하는 것 0이면 카메라이동속도가 느리고 1이면 빠름
    pivot.position.lerp(worldPosition, 0.9); // 선형보관이 완벽하게 따라가는 것이 아닌 근접하게 따라가는 것이라 살짝살짝 끊어짐
    // 즉, 피벗은 기존의 카메라 위치 그리고 내부의 worldPosition은 자동차의 위치
    // 피벗과 wp를 비교하고 피벗은 카메라의 위치는 자동차의 wp로 바뀌며 훅에서 카메라를
    // 피벗에 추가하고 씬에 피벗을 추가하여 카메라가 자동차를 따라가는 것
  };

  const makeStage1 = () => {
    const chassisPosition = new Vector3().setFromMatrixPosition(
      chassisBody.current.matrixWorld
    );
    // console.log("x", chassisPosition.x);
    //2.3
    // console.log("z", chassisPosition.z);
    //4.2
    //원의 크기가 0.7
    if (
      Math.abs(3 - chassisPosition.x) < 0.7 &&
      Math.abs(4.9 - chassisPosition.z) < 0.7
    ) {
      setStage1(true);
    } else {
      setStage1(false);
    }
  };
  const makeStage2 = () => {
    const chassisPosition = new Vector3().setFromMatrixPosition(
      chassisBody.current.matrixWorld
    );
    // console.log("x", chassisPosition.x);
    // -2.2
    // console.log("z", chassisPosition.z);
    // 4.8
    if (
      Math.abs(-3 - chassisPosition.x) < 0.8 &&
      Math.abs(4.8 - chassisPosition.z) < 0.8
    ) {
      setStage2(true);
    } else {
      setStage2(false);
    }
  };

  // 매 프래임마다. mfc()를 호출
  useFrame(() => {
    makeFollowCam();
    makeStage1();
    makeStage2();
  });

  return (
    <group ref={vehicle}>
      <group ref={chassisBody} name="chassisbody">
        <CarBody />
        {/* <DummyCarBody
          width={chassisBodyValue.width}
          height={chassisBodyValue.height}
          front={chassisBodyValue.front}
        /> */}
      </group>
      <Wheel wheelRef={wheels[0]} radius={wheelRadius} leftSide={true} />
      <Wheel wheelRef={wheels[1]} radius={wheelRadius} />
      <Wheel wheelRef={wheels[2]} radius={wheelRadius} leftSide={true} />
      <Wheel wheelRef={wheels[3]} radius={wheelRadius} />
      {/* <DummyWheel wheelRef={wheels[0]} radius={wheelRadius} /> */}
      {/* <DummyWheel wheelRef={wheels[1]} radius={wheelRadius} /> */}
      {/* <DummyWheel wheelRef={wheels[2]} radius={wheelRadius} /> */}
      {/* <DummyWheel wheelRef={wheels[3]} radius={wheelRadius} /> */}
    </group>
  );
};

export default Car;
