import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './Login';
import ColtHome from "./ColtHome.jsx";
import LabHome from "./LabHome.jsx";
import LabRequests from "./LabRequests.jsx";
import ColtAnalysis from "./ColtAnalysis.jsx";
import TreeView from './TreeView.jsx';
import { getUser } from '../utils/user.js';

function RoleMappedRoutes({ routeMap }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const checkLogin = async () => {
            const user = await getUser();
            setIsAuthenticated(user !== false);
            setUserRole(user.role);
        }
        checkLogin()
    }, []);
    return (
        <>
            {userRole === null || isAuthenticated == null ? <p>Loading...</p> :
                isAuthenticated === false ? <Navigate to={"/login"} /> : routeMap[userRole]}
        </>
    );
}

export default function AuthRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<RoleMappedRoutes routeMap={
                    {
                        'coltivatore': <ColtHome />,
                        'laboratorio': <LabHome />
                    }
                } />} />
                <Route path="/analyses" element={<RoleMappedRoutes routeMap={
                    {
                        'coltivatore': <ColtAnalysis />,
                        'laboratorio': <Navigate to="/login" />
                    }
                } />} />
                <Route path="/new" element={<RoleMappedRoutes routeMap={
                    {
                        'coltivatore': <Navigate to="/login" />,
                        'laboratorio': <LabRequests />
                    }
                } />} />
                <Route path="/:treeId" element={<RoleMappedRoutes routeMap={
                    {
                        'coltivatore': <TreeView />,
                        'laboratorio': <Navigate to="/login" />
                    }
                } />} />
            </Routes>
        </BrowserRouter>
    );
}