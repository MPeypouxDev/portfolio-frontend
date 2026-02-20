import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from 'react-router-dom' 

function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return null

    if (!isAuthenticated) {
        return <Navigate to="/admin/login"/>
    } else {
        return <Outlet></Outlet>
    }
}

export default ProtectedRoute