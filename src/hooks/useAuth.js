import { authService } from "../services/authService";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (authService.isAuthenticated()) {
            authService.me()
            .then(() => setIsAuthenticated(true))
            .catch(() => {
                authService.removeToken()
                setIsAuthenticated(false)
            })
        }
    }, []);

    const logout = () => {
        authService.logout()
        authService.removeToken()
        setIsAuthenticated(false);
    };

    return {isAuthenticated, logout}
}