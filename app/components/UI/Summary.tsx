'use client';

import { useWorkspace, MAX_MONITORS } from '../../store/useWorkSpace';

export default function Summary() {
  const { desk, chair, monitors, lamp, plant } = useWorkspace();
  const monitorCount = Math.min(monitors, MAX_MONITORS);

  return (
    <div className="w-105 rounded-2xl border border-white/20 bg-white/10 px-6 py-4 shadow-xl backdrop-blur-xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">Your Setup</h2>
        <button className="cursor-pointer rounded-xl bg-white px-4 py-2 text-sm text-black transition hover:scale-105">
          Rent Now
        </button>
      </div>

      <div className="space-y-1 text-sm text-gray-300">
        <p>Desk: {desk || '-'}</p>
        <p>Chair: {chair || '-'}</p>
        <p>Monitors: {monitorCount}</p>
        <p>Lamp: {lamp ? 'Yes' : 'No'}</p>
        <p>Plant: {plant ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
}
