import type { User } from "./user";

export interface AuthState {
    accessToken: string | null;
    user: User | null; // Replace 'any' with your user type if available
    loading: boolean;
    clearState: () => void;
    register: (username: string, password: string, email: string, firstName: string, lastName: string) => Promise<void>;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    fetchMe: () => Promise<void>;
    refresh: () => Promise<void>;
}