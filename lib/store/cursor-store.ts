// import { create } from 'zustand';

// interface CursorStore {
//   projectImage: string | null;
//   setProjectImage: (image: string | null) => void;
// }

// export const useCursorStore = create<CursorStore>((set) => ({
//   projectImage: null,
//   setProjectImage: (image: string | null) => set({ projectImage: image }),
// }));

import { create } from 'zustand';

interface CursorStore {
  projectImage: string | null;
  isCustomCursorActive: boolean; // New flag to control cursor visibility
  setProjectImage: (image: string | null) => void;
  setCustomCursorActive: (isActive: boolean) => void; // New method to toggle custom cursor
}

export const useCursorStore = create<CursorStore>((set) => ({
  projectImage: null,
  isCustomCursorActive: false,
  setProjectImage: (image: string | null) => set({ projectImage: image }),
  setCustomCursorActive: (isActive: boolean) =>
    set({ isCustomCursorActive: isActive }),
}));
