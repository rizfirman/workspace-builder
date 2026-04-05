import * as THREE from 'three';

const prepareModel = (scene: THREE.Object3D, targetSize: number) => {
  const cloned = scene.clone();

  const box = new THREE.Box3().setFromObject(cloned);
  const size = new THREE.Vector3();
  box.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = targetSize / maxDim;
  cloned.scale.setScalar(scale);

  const scaledBox = new THREE.Box3().setFromObject(cloned);
  const c = new THREE.Vector3();
  scaledBox.getCenter(c);
  cloned.position.x -= c.x;
  cloned.position.z -= c.z;
  cloned.position.y -= scaledBox.min.y;

  const newBox = new THREE.Box3().setFromObject(cloned);
  const newSize = new THREE.Vector3();
  newBox.getSize(newSize);

  return {
    object: cloned,
    height: newSize.y,
    width: newSize.x,
    depth: newSize.z,
  };
};

export default prepareModel;
