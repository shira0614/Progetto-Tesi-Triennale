import Login from './Login';
import ColtHome from "./ColtHome.jsx";
import LabHome from "./LabHome.jsx";
import LabRequests from "./LabRequests.jsx";
import {createBrowserRouter, Navigate, Route, Router, RouterProvider, Routes, BrowserRouter} from "react-router-dom";
import verifyToken from "../utils/verifyToken.js";
import { useState } from "react";
import { useEffect } from "react";
import ColtAnalysis from "./ColtAnalysis.jsx";
import AddTreeDialogue from './AddTreeDialogue.jsx';
import TreeView from './TreeView.jsx';
import { RoleContext } from "./context/RoleContext.jsx";

export default function AuthRoutes() {
    const [token, setToken] = useState(verifyToken());
    const [userRole, setUserRole] = useState(null);
    const roleValue = { userRole, setUserRole };

    useEffect(() => {
        const result = verifyToken();
        setToken(result);
        if (result) {
            setUserRole(localStorage.getItem('role'));
        }
    }, []);

    useEffect(() => {
        const role = localStorage.getItem('role');
        setUserRole(role);
    }, [localStorage.getItem('role')]);

    return (
        <RoleContext.Provider value={roleValue}>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login verify={setToken} />} />
                    <Route path="/" element={userRole === 'coltivatore' ? <ColtHome /> : <LabHome />} />
                    <Route path="/analyses" element={userRole === 'coltivatore' ? <ColtAnalysis /> : null} />
                    <Route path="/new" element={userRole === 'laboratorio' ? <LabRequests /> : null} />
                    <Route path="/:treeId" element={userRole === 'coltivatore' ? <TreeView /> : null } />
                </Routes>
            </BrowserRouter>
        </RoleContext.Provider>
    );
}