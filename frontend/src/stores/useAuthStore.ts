import { create } from 'zustand';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import type { AuthState } from '@/types/store';


export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,
    register: async (username, password, email, firstName, lastName) => {
        try {
            // Call api to sign up the user 
            set({ loading: true });
            await authService.register(username, password, email, firstName, lastName);
            toast.success('Sign up successful! Please log in.');
        } catch (error) {
            console.error('Error signing up:', error);
            toast.error('Error signing up. Please try again.');
        } finally {
            set({ loading: false });
        }
    } 
}));