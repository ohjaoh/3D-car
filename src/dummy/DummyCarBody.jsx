const DummyCarBody = (props) => {
  const { width, height, front } = props;
  return (
    <mesh>
      <boxGeometry args={[width, height, front]} />
      <meshBasicMaterial color="rgba(222,111,000)" />
    </mesh>
  );
};

export default DummyCarBody;
