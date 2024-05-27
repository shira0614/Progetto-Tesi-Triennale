import Login from './Login';
import ColtHome from "./ColtHome.jsx";
import LabHome from "./LabHome.jsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import verifyToken from "../utils/verifyToken.js";
import { useState } from "react";
import { useEffect } from "react";


export default function AuthRoutes() {
    const [token, setToken] = useState(verifyToken());
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const result = verifyToken();
        setToken(result);
        if (result) {
            setUserRole(localStorage.getItem('role'));
        }
    }, []);

    const coltRouter = createBrowserRouter([
        {path: "/", element: <ColtHome />},
        {path: "/login", element: <Login verify={setToken} />}
    ]);

    const labRouter = createBrowserRouter([
        {path: "/", element: <LabHome />},
        {path: "/login", element: <Login verify={setToken} />}
    ]);

    const publicRouter = createBrowserRouter([
        {path: "/", element: <Navigate to="/login" />},
        {path: "/login", element: <Login verify={setToken} />}
    ]);

    return (
        <RouterProvider router={
            (() => {
                if(!token) {
                    return publicRouter;
                } else if(userRole === 'coltivatore') {
                    return coltRouter;
                } else if(userRole === 'laboratorio') {
                    return labRouter;
                } else {
                    return publicRouter; // default router
                }
            })()
        }/>
    );
}
