'use client';

import { useWorkspace } from '../store/useWorkSpace';
import { useGLTF } from '@react-three/drei';
import { useMemo } from 'react';
import * as THREE from 'three';

const ChairModel = () => {
  const { chair, deskBounds } = useWorkspace();

  const c1 = useGLTF('/models/chair1.glb');
  const c2 = useGLTF('/models/chair2.glb');

  const scene = useMemo(() => {
    if (!chair || !deskBounds) return null;

    const original = chair === 'chair1' ? c1.scene : c2.scene;
    const cloned = original.clone();

    const box = new THREE.Box3().setFromObject(cloned);
    const size = new THREE.Vector3();
    box.getSize(size);

    const maxDim = Math.max(size.x, size.y, size.z);
    const targetSize = 1;
    const scale = targetSize / maxDim;
    cloned.scale.setScalar(scale);

    const scaledBox = new THREE.Box3().setFromObject(cloned);
    const c = new THREE.Vector3();
    scaledBox.getCenter(c);
    cloned.position.x -= c.x;
    cloned.position.z -= c.z;
    cloned.position.y -= scaledBox.min.y;

    const scaledSize = new THREE.Vector3();
    new THREE.Box3().setFromObject(cloned).getSize(scaledSize);

    const zOffset = deskBounds.depth / 2 + scaledSize.z / 2 + 0.2;
    cloned.position.z += zOffset;
    cloned.position.y += 0.01;

    cloned.rotation.y = chair === 'chair1' ? 0 : Math.PI;

    return cloned;
  }, [chair, deskBounds, c1.scene, c2.scene]);

  if (!scene) return null;

  return <primitive object={scene} />;
};

export default ChairModel;
