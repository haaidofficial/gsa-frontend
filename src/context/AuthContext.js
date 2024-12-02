// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {

        const storedToken = localStorage.getItem("token");

        if (storedToken && !isTokenExpired(storedToken)) {
            setToken(storedToken);
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
            setToken(null);
        }

        setLoading(false);
    }, []);

    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // Get current time in seconds
            return decodedToken.exp < currentTime;
        } catch (error) {
            return true; // If token is invalid, consider it expired
        }
    };

    const login = (token) => {
        localStorage.setItem("token", token);
        setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsAuthenticated(false);
        router.push("/admin/login");
    };

    return (
        <AuthContext.Provider
            value={{ token, isAuthenticated, loading, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
