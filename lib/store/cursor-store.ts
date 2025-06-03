import { create } from 'zustand';
import { useNavigation } from '@/lib/context/navigation-context';

interface CursorStore {
  projectImage: string | null;
  setProjectImage: (image: string | null) => void;
}

export const useCursorStore = create<CursorStore>((set) => ({
  projectImage: null,
  setProjectImage: (image: string | null) => set({ projectImage: image }),
}));

// Derive custom cursor state from navigation context instead of useEffect
export const useCustomCursorActive = () => {
  const { currentSection } = useNavigation();
  // Custom cursor is active when we're on the projects page
  return currentSection === 'projects';
};
