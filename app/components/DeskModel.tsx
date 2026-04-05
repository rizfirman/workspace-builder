'use client';

import { useWorkspace } from '../store/useWorkSpace';
import { useGLTF } from '@react-three/drei';
import { useMemo, useEffect } from 'react';
import * as THREE from 'three';

const DeskModel = () => {
  const { desk, setDeskBounds } = useWorkspace();

  const model1 = useGLTF('/models/desk1.glb');
  const model2 = useGLTF('/models/desk2.glb');

  const result = useMemo(() => {
    if (!desk) return null;

    const original = desk === 'desk1' ? model1.scene : model2.scene;
    const cloned = original.clone();

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 2;
    const scale = targetSize / maxDim;
    cloned.scale.setScalar(scale);

    const scaledBox = new THREE.Box3().setFromObject(cloned);
    const c = new THREE.Vector3();
    scaledBox.getCenter(c);
    cloned.position.x -= c.x;
    cloned.position.z -= c.z;
    cloned.position.y -= scaledBox.min.y;

    const finalBox = new THREE.Box3().setFromObject(cloned);
    const finalSize = new THREE.Vector3();
    finalBox.getSize(finalSize);

    return {
      scene: cloned,
      bounds: {
        width: finalSize.x,
        height: finalSize.y,
        depth: finalSize.z,

        topY: finalBox.max.y,
      },
    };
  }, [desk, model1.scene, model2.scene]);

  useEffect(() => {
    if (result?.bounds) {
      setDeskBounds(result.bounds);
    }
  }, [result, setDeskBounds]);

  if (!result) return null;

  return <primitive object={result.scene} />;
};

export default DeskModel;
