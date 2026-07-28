import React from 'react'
import { Navigate } from 'react-router-dom';
import { useEffect } from "react";
import api from "../api/Api";

const ProtectedRoute = ({children}) => {

    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const token=localStorage.getItem("token");

    useEffect(() => {

        const verifyUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }
        }

        verifyUser();

    }, []);

    if(token){
        return children;
    }
    
    return <Navigate to='/login' />
}

export default ProtectedRoute