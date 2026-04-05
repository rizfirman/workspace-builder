'use client';

import { useWorkspace, MAX_MONITORS } from '../store/useWorkSpace';
import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import prepareModel from '../utils/prepareModel';

const Accessories = () => {
  const { monitors: monitorsRaw, lamp, plant, deskBounds } = useWorkspace();
  const monitors = Math.min(monitorsRaw, MAX_MONITORS);

  const monitorModel = useGLTF('/models/monitor.glb');
  const lampModel = useGLTF('/models/lamp.glb');
  const plantModel = useGLTF('/models/plant.glb');

  const monitor = useMemo(() => prepareModel(monitorModel.scene, 0.8), [monitorModel.scene]);

  const lampObj = useMemo(() => prepareModel(lampModel.scene, 1), [lampModel.scene]);

  const plantObj = useMemo(() => prepareModel(plantModel.scene, 0.38), [plantModel.scene]);

  if (!deskBounds) return null;

  const deskBackZ = -deskBounds.depth / 2 + 0.12;

  const monitorFacingY = -Math.PI / 2;

  return (
    <>
      {[...Array(monitors)].map((_, i) => {
        const spacing = deskBounds.width / (monitors + 1);
        const x = -deskBounds.width / 2 + spacing * (i + 1);

        return (
          <group
            key={i}
            position={[x, deskBounds.topY, deskBackZ]}
            rotation={[0, monitorFacingY, 0]}
          >
            <primitive object={monitor.object.clone()} />
          </group>
        );
      })}

      {lamp && (
        <group
          position={[
            deskBounds.width / 2 - lampObj.width / 2 + 0.03,
            deskBounds.topY,
            deskBackZ + 0.08,
          ]}
          rotation={[0, Math.PI, 0]}
        >
          <primitive object={lampObj.object.clone()} />
        </group>
      )}

      {plant && (
        <group
          position={[
            -deskBounds.width / 2 + plantObj.width / 2 + 0.08,
            deskBounds.topY,
            deskBackZ + 0.06,
          ]}
        >
          <primitive object={plantObj.object.clone()} />
        </group>
      )}
    </>
  );
};

export default Accessories;
