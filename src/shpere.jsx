import React, { useState } from 'react'
import { useSphere } from "@react-three/cannon";

export function Sphere(props) {

  // 충돌체의 크기는 매쉬보다 크게 할 수 있음
  const [meshRef,api] = useSphere(
    () => ({ args: [1], mass: 1, ...props }),
  )

  const [hovered, setHover] = useState(false)

  return (
    <mesh
      {...props}
      ref={meshRef}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      onPointerDown={() => api.velocity.set(0,5,0)}
      >
      <sphereGeometry args={[0.5]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}