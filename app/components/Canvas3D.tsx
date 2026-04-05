'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import DeskModel from './DeskModel';
import ChairModel from './ChairModel';
import Accessories from './Accessories';

const Canvas3D = () => {
  return (
    <div className="h-full flex-1">
      <Canvas camera={{ position: [0, 2.5, 6], fov: 45 }} shadows>
        <color attach="background" args={['#0f0f0f']} />

        <ambientLight intensity={0.4} />

        <directionalLight position={[5, 8, 5]} intensity={1} castShadow />

        <Environment preset="city" />

        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={10} blur={2} far={5} />

        <group>
          <DeskModel />
          <ChairModel />
          <Accessories />
        </group>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
};

export default Canvas3D;
