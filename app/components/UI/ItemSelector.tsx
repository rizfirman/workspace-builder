'use client';

import { useEffect } from 'react';
import { useWorkspace, MAX_MONITORS } from '../../store/useWorkSpace';

export default function ItemSelector() {
  const { setDesk, setChair, toggleMonitor, toggleLamp, togglePlant, desk, chair, monitors } =
    useWorkspace();

  useEffect(() => {
    const n = useWorkspace.getState().monitors;
    if (n > MAX_MONITORS) useWorkspace.setState({ monitors: MAX_MONITORS });
  }, []);

  return (
    <div className="w-64 space-y-6 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-xl">
      <h2 className="text-lg font-semibold">Customize</h2>

      {/* Desk */}
      <div>
        <p className="mb-2 text-sm text-gray-300">Desk</p>
        <div className="flex gap-2">
          <button
            onClick={() => setDesk('desk1')}
            className={`option-btn cursor-pointer ${desk === 'desk1' ? 'bg-white/30' : ''}`}
          >
            D1
          </button>
          <button
            onClick={() => setDesk('desk2')}
            className={`option-btn cursor-pointer ${desk === 'desk2' ? 'bg-white/30' : ''}`}
          >
            D2
          </button>
        </div>
      </div>

      {/* Chair */}
      <div>
        <p className="mb-2 text-sm text-gray-300">Chair</p>
        <div className="flex gap-2">
          <button
            onClick={() => setChair('chair1')}
            className={`option-btn cursor-pointer ${chair === 'chair1' ? 'bg-white/30' : ''}`}
          >
            C1
          </button>
          <button
            onClick={() => setChair('chair2')}
            className={`option-btn cursor-pointer ${chair === 'chair2' ? 'bg-white/30' : ''}`}
          >
            C2
          </button>
        </div>
      </div>

      {/* Accessories */}
      <div>
        <p className="mb-2 text-sm text-gray-300">Accessories</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={toggleMonitor}
            className={`option-btn ${monitors > 0 ? 'bg-white/30' : ''}`}
          >
            Monitor
          </button>
          <button onClick={toggleLamp} className="option-btn">
            Lamp
          </button>
          <button onClick={togglePlant} className="option-btn">
            Plant
          </button>
        </div>
      </div>
    </div>
  );
}
