import { useAuthStore } from '@/stores/useAuthStore'
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoute() {
    const { accessToken, loading, refresh } = useAuthStore();
    const [starting, setStarting] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (!accessToken) {
                await refresh();
            }
            setStarting(false);
        };
        init();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (starting || loading) {
        return <div className="flex h-screen item-center justify-center">Loading....</div>
    }

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