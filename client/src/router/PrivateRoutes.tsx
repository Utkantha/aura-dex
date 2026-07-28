import React from 'react';
import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom"; // Correct import
import { useSelector } from 'react-redux';
import type { AppState } from '@/lib/types';
import { Navigate } from 'react-router-dom';

interface PrivateRoutesProps {
    children: React.ReactNode;
}

const PrivateRoutes: React.FC<PrivateRoutesProps> = ({ children }) => {
    // const navigate = useNavigate();
    const loginstate = useSelector((e: AppState) => e.isLoggedIn)

    const isLoggedIn = loginstate || Cookies.get("isLoggedIn") && Cookies.get("accessToken");

    // useEffect(() => {
    //     if (!isLoggedIn) {
    //         navigate("/login");
    //     }
    // }, [isLoggedIn, navigate]); // Dependency array to avoid unnecessary renders

    // Render the children only if the user is logged in
    return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;