import api from '@/lib/axios';

export const authService = {
    register: async (
        username: string,
        password: string,
        email: string,
        firstName: string,
        lastName: string) => {
        const res = await api.post('auth/register', { username, password, email, firstName, lastName }, { withCredentials: true });
        return res.data;
    },

    login: async (
        username: string,
        password: string) => {
        const res = await api.post('auth/login', { username, password }, { withCredentials: true });
        return res.data;
    },

    logout: async () => {
        return await api.post('auth/signout', {}, { withCredentials: true });
    },
    fetchMe: async () => {
        const res = await api.get('user/me', { withCredentials: true });
        return res.data.user;
    },
    refresh: async () => {
        const res = await api.post('auth/refresh', { withCredentials: true });
        return res.data.accessToken;
    }
}