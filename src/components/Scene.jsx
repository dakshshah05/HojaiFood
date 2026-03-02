import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Stars } from '@react-three/drei';
import { useRef } from 'react';

const FloatingSphere = ({ position, color, emissiveColor, scale = 1 }) => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.x = t * 0.15;
      ref.current.rotation.y = t * 0.1;
      ref.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
      <Sphere ref={ref} args={[scale, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          emissive={emissiveColor}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.1}
          speed={2}
          distort={0.35}
          radius={1}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.9} color="#fffff0" />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[3, 2, 4]} intensity={0.8} color="#22c55e" />
      <pointLight position={[-3, -1, 2]} intensity={0.4} color="#34d399" />

      <FloatingSphere position={[3.5, 0.5, -3]} color="#bbf7d0" emissiveColor="#22c55e" scale={1.2} />
      <FloatingSphere position={[-3, -1, -4]} color="#d1fae5" emissiveColor="#059669" scale={0.8} />
      <FloatingSphere position={[0, 2, -5]} color="#ecfdf5" emissiveColor="#16a34a" scale={0.5} />
    </>
  );
};

export default function SceneContainer() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
