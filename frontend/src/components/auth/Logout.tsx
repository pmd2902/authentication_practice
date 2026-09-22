import { Button } from '../ui/button';
import { useAuthStore } from '@/stores/useAuthStore';
import { useNavigate } from 'react-router';

function Logout() {
    const { logout, loading } = useAuthStore();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await logout();
        navigate("/login");
    }
    return (
        <Button onClick={handleLogout} disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
        </Button>
    )
}

export default Logout;