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

export default function AuthRoutes() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const roleValue = { userRole, setUserRole };

    useEffect(() => {
        const role = localStorage.getItem('role');
        setUserRole(role);
    }, [localStorage.getItem('role')]);

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