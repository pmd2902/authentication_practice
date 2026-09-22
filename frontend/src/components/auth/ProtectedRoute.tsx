import { useAuthStore } from '@/stores/useAuthStore'
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute() {
    const { accessToken } = useAuthStore();
    if (!accessToken) {
        return <Navigate
            to={"/login"}
            replace
        />
    }
    return (
        <Outlet />
    )
}

export default ProtectedRoute