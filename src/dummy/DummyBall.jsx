import { useSphere } from "@react-three/cannon";

const DummyBall = (props) => {
  const { args } = props;

  const[ref]= useSphere(() => ({
    args: args,
    mass: 1,
    //타입을 안적어도 다이나믹이라 안적음
    ...props,
  }));
  return (
    <mesh ref={ref}>
      <sphereGeometry  args={args}/>
      <meshBasicMaterial color={"orange"} transparent opacity={0.5} />
    </mesh>
  );
};

export default DummyBall;
