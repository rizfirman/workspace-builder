'use client';

import { useWorkspace } from '../store/useWorkSpace';

const WorkspaceCanvas = () => {
  const { desk, chair, monitors, lamp, plant } = useWorkspace();

  return (
    <div className="relative flex flex-1 items-center justify-center bg-gray-100">
      {desk && <div className="bg-brown-500 absolute bottom-20 h-6 w-64 rounded">{desk}</div>}

      {chair && (
        <div className="absolute bottom-10 h-20 w-20 rounded-full bg-blue-400">{chair}</div>
      )}

      {[...Array(monitors)].map((_, i) => (
        <div
          key={i}
          className="absolute bottom-32 h-12 w-20 bg-black"
          style={{ left: `${40 + i * 90}px` }}
        />
      ))}

      {/* Lamp */}
      {lamp && <div className="absolute right-20 bottom-32 h-20 w-10 bg-yellow-400" />}

      {/* Plant */}
      {plant && <div className="absolute bottom-32 left-20 h-10 w-10 rounded-full bg-green-500" />}
    </div>
  );
};

export default WorkspaceCanvas;
