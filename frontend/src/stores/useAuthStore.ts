import { create } from 'zustand';
import { toast } from 'sonner';
import { authService } from '@/services/authService';
import type { AuthState } from '@/types/store';


export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    clearState: () => {
        set({ accessToken: null, user: null, loading: false });
    },
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
    },
    login: async (username, password) => {
        try {
            set({ loading: true })
            const { accessToken } = await authService.login(username, password);
            set({ accessToken });
            toast.success('Login successful!');
            await get().fetchMe();
        } catch (error) {
            console.log(error);
            toast.error('Error logging in. Please try again.');
        } finally {
            set({ loading: false })
        }
    },
    logout: async () => {
        try {
            set({ loading: true });
            get().clearState();
            await authService.logout();
            toast.success("Logout successful");
        } catch (error) {
            console.error("Error logging out:", error);
            toast.error("Error logging out. Please try again.");
        } finally {
            set({ loading: false });
        }
    },
    fetchMe: async () => {
        try {
            set({ loading: true })
            const user = await authService.fetchMe();
            set({ user });
        } catch (error) {
            console.log('Error', error)
            toast.error('Error fetching user. Please try again.')
            set({ accessToken: null, user: null })
        } finally {
            set({ loading: false })
        }
    },
    refresh: async () => {
        try {
            set({ loading: true })
            const { user, fetchMe } = get();
            const accessToken = await authService.refresh();

            set({ accessToken })

            if (!user) {
                await fetchMe();
            }
        } catch (error) {
            console.log('Error: ', error);
            toast.error('Can not refresh access token!')
            get().clearState();
        }
        finally {
            set({ loading: false });
        }
    }
}));