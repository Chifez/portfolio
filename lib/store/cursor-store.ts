import { create } from 'zustand';

interface CursorStore {
  projectImage: string | null;
  setProjectImage: (image: string | null) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  projectImage: null,
  setProjectImage: (image: string | null) => set({ projectImage: image }),
}));
