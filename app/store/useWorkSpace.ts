import { create } from 'zustand';

export const MAX_MONITORS = 1;

type DeskBounds = {
  width: number;
  height: number;
  depth: number;
  topY: number;
};

type WorkspaceState = {
  desk: string | null;
  chair: string | null;
  monitors: number;
  lamp: boolean;
  plant: boolean;

  deskBounds: DeskBounds | null;

  setDesk: (desk: string) => void;
  setChair: (chair: string) => void;
  toggleMonitor: () => void;
  toggleLamp: () => void;
  togglePlant: () => void;

  setDeskBounds: (bounds: DeskBounds) => void;
};

export const useWorkspace = create<WorkspaceState>((set) => ({
  desk: null,
  chair: null,
  monitors: 0,
  lamp: false,
  plant: false,

  deskBounds: null,

  setDesk: (desk) =>
    set((s) => {
      if (s.desk === desk) return s;
      return { desk, deskBounds: null };
    }),

  setChair: (chair) => set({ chair }),

  toggleMonitor: () =>
    set((s) => ({
      monitors: s.monitors > 0 ? 0 : MAX_MONITORS,
    })),

  toggleLamp: () => set((s) => ({ lamp: !s.lamp })),
  togglePlant: () => set((s) => ({ plant: !s.plant })),

  setDeskBounds: (bounds) => set({ deskBounds: bounds }),
}));
