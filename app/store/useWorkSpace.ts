import { create } from 'zustand';

/** Meja dinormalisasi kecil — hanya cukup untuk satu layar. */
export const MAX_MONITORS = 1;

type DeskBounds = {
  width: number;
  height: number;
  depth: number;
  topY: number;
};

type WorkspaceState = {
  // selected items
  desk: string | null;
  chair: string | null;
  monitors: number;
  lamp: boolean;
  plant: boolean;

  // 🧠 spatial data (IMPORTANT)
  deskBounds: DeskBounds | null;

  // actions
  setDesk: (desk: string) => void;
  setChair: (chair: string) => void;
  toggleMonitor: () => void;
  toggleLamp: () => void;
  togglePlant: () => void;

  // spatial setter
  setDeskBounds: (bounds: DeskBounds) => void;
};

export const useWorkspace = create<WorkspaceState>((set) => ({
  // initial state
  desk: null,
  chair: null,
  monitors: 0,
  lamp: false,
  plant: false,

  deskBounds: null,

  // actions
  setDesk: (desk) =>
    set((s) => {
      // Klik ulang meja yang sama: jangan reset deskBounds (tanpa itu useMemo Desk tidak jalan & bounds tetap null)
      if (s.desk === desk) return s
      return { desk, deskBounds: null }
    }),

  setChair: (chair) => set({ chair }),

  toggleMonitor: () =>
    set((s) => ({
      monitors: s.monitors > 0 ? 0 : MAX_MONITORS,
    })),

  toggleLamp: () => set((s) => ({ lamp: !s.lamp })),
  togglePlant: () => set((s) => ({ plant: !s.plant })),

  // 🧠 spatial setter
  setDeskBounds: (bounds) => set({ deskBounds: bounds }),
}));
