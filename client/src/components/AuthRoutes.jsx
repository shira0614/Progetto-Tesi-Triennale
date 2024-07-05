import React, { useState, useEffect, useContext } from 'react';
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from './Login';
import ColtHome from "./ColtHome.jsx";
import LabHome from "./LabHome.jsx";
import LabRequests from "./LabRequests.jsx";
import ColtAnalysis from "./ColtAnalysis.jsx";
import TreeView from './TreeView.jsx';
import { AuthContext } from './context/AuthContext.jsx';
import { RoleContext } from "./context/RoleContext.jsx";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie'

export default function AuthRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const roleValue = { userRole, setUserRole };


    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    };

    const validateToken = () => {
        const token = getCookie('token');
        console.log("Token retrieved from cookie:", token); // Log the token
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Decoded token:", decoded); // Log the decoded token
                const currentTime = Date.now() / 1000;
                if (decoded.exp > currentTime) {
                    console.log("Token is valid");
                    return { isValid: true, role: decoded.data.role, username: decoded.data.username };
                } else {
                    console.log("Token has expired");
                    return { isValid: false };
                }
            } catch (error) {
                console.error("Error decoding token:", error);
                return { isValid: false };
            }
        } else {
            console.log("Token not found");
            return { isValid: false };
        }
    };

    useEffect(() => {
        const { isValid, role, username } = validateToken();
        if (isValid) {
            setIsAuthenticated(true);
            setUserRole(role);
            localStorage.setItem("role", role);
            localStorage.setItem("username", username);
        } else {
            setIsAuthenticated(false);
            setUserRole(null);
            localStorage.removeItem("role");
            localStorage.removeItem("username");
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <RoleContext.Provider value={roleValue}>
                <BrowserRouter>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={isAuthenticated ? (userRole === 'coltivatore' ? <ColtHome /> : <LabHome />) : <Navigate to="/login" />} />
                            <Route path="/analyses" element={isAuthenticated && userRole === 'coltivatore' ? <ColtAnalysis /> : <Navigate to="/login" />} />
                            <Route path="/new" element={isAuthenticated && userRole === 'laboratorio' ? <LabRequests /> : <Navigate to="/login" />} />
                            <Route path="/:treeId" element={isAuthenticated && userRole === 'coltivatore' ? <TreeView /> : <Navigate to="/login" />} />
                        </Routes>
                </BrowserRouter>
            </RoleContext.Provider>
        </AuthContext.Provider>
    );
}