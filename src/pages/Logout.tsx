import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export const Logout = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn } = useAuth();

    useEffect(() => {
        setIsLoggedIn(false);
        localStorage.setItem("token", "");
        navigate("/signin");
    }, [navigate, setIsLoggedIn]);

    return null; 
};
