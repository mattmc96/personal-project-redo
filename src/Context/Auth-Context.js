import React, { createContext, useEffect, useState } from "react";
import AuthService from "../components/Auth/Auth-Services";

export const AuthContext = createContext();

export default AuthContext ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        AuthService.isAuthenticated().then((data) => {
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    }, []);
};
