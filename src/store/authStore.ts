import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { mockUsers } from '../data/mockData';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, phone: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        await new Promise(r => setTimeout(r, 800));
        const user = mockUsers.find(u => u.email === email);
        if (!user) return { success: false, message: 'No account found with this email.' };
        if (password.length < 4) return { success: false, message: 'Invalid password.' };
        set({ user, isAuthenticated: true });
        return { success: true, message: 'Welcome back!' };
      },

      signup: async (name, email, phone, _password) => {
        await new Promise(r => setTimeout(r, 1000));
        const existing = mockUsers.find(u => u.email === email);
        if (existing) return { success: false, message: 'An account with this email already exists.' };
        const newUser: User = {
          id: `u_${Date.now()}`, name, email, phone,
          role: 'customer', addresses: [], createdAt: new Date().toISOString(),
        };
        mockUsers.push(newUser);
        set({ user: newUser, isAuthenticated: true });
        return { success: true, message: 'Account created successfully!' };
      },

      logout: () => set({ user: null, isAuthenticated: false }),

      updateUser: (updates) => {
        const { user } = get();
        if (user) set({ user: { ...user, ...updates } });
      },
    }),
    { name: 'shopease-auth' }
  )
);
