// vehicle api, chassisApi

import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { stage1 } from "./atom";

const useVehicleControls = (vehicleApi, chassisApi) => {
  const motionStage = useRecoilValue(stage1);
  const [controls, setControls] = useState({});

  // 키누르고 떼는 이벤트헨들러
  useEffect(() => {
    const KeyDownPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key]: true,
      }));
      // console.log("Down", e);
    };
    const KeyUpPressHandeler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key]: false,
      }));
      // console.log("Up", e);
    };

    window.addEventListener("keydown", KeyDownPressHandler);
    window.addEventListener("keyup", KeyUpPressHandeler);

    return () => {
      window.removeEventListener("keydown", KeyDownPressHandler);
      window.removeEventListener("keyup", KeyUpPressHandeler);
    };
  }, []);

  useEffect(() => {
    // console.log(vehicleApi);
    if (controls.ArrowUp) {
      vehicleApi.applyEngineForce(120, 2);
      vehicleApi.applyEngineForce(120, 3);
    } else if (controls.ArrowDown) {
      vehicleApi.applyEngineForce(-120, 2);
      vehicleApi.applyEngineForce(-120, 3);
    }
    else if (controls.Enter) {
        vehicleApi.setBrake(1, 2); // 0~1 1이 최대
        vehicleApi.setBrake(1, 3);
    }
    else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.ArrowLeft) {
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
    } else if (controls.ArrowRight) {
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }
  }, [controls, vehicleApi, chassisApi]);

  const onHandleHistory = () => {
    const url = "https://github.com/ohjaoh";
    window.open(url, "_blank");
  };

  useEffect(() => {
    if(controls.Enter && motionStage){
      onHandleHistory()
      setControls((controls)=>({
        ...controls,
        Enter:false,
      }))
    }
  },[controls, motionStage])

  return controls;
};
export default useVehicleControls;
