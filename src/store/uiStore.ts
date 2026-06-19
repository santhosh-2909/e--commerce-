import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeStore {
  isDark: boolean;
  toggle: () => void;
  setDark: (v: boolean) => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      isDark: false,
      toggle: () => {
        const next = !get().isDark;
        set({ isDark: next });
        if (next) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      },
      setDark: (v) => {
        set({ isDark: v });
        if (v) document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
      },
    }),
    { name: 'shopease-theme' }
  )
);

interface UIStore {
  isSearchOpen: boolean;
  isAuthModalOpen: boolean;
  authModalTab: 'login' | 'signup';
  quickViewProductId: string | null;
  setSearchOpen: (v: boolean) => void;
  setAuthModalOpen: (v: boolean, tab?: 'login' | 'signup') => void;
  setQuickViewProductId: (id: string | null) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isSearchOpen: false,
  isAuthModalOpen: false,
  authModalTab: 'login',
  quickViewProductId: null,
  setSearchOpen: (v) => set({ isSearchOpen: v }),
  setAuthModalOpen: (v, tab = 'login') => set({ isAuthModalOpen: v, authModalTab: tab }),
  setQuickViewProductId: (id) => set({ quickViewProductId: id }),
}));
