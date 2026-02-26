import { authService } from "../services/authService";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (authService.isAuthenticated()) {
            authService.me()
            .then(() => setIsAuthenticated(true))
            .catch(() => {
                authService.removeToken()
                setIsAuthenticated(false)
            })
            .finally(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, []);

    const logout = () => {
        authService.logout()
        authService.removeToken()
        setIsAuthenticated(false);
    };

    return {isAuthenticated,loading, logout}
}