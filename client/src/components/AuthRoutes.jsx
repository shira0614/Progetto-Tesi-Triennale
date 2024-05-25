import Login from './Login';
import ColtHome from "./ColtHome.jsx";
import LabHome from "./LabHome.jsx";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import verifyToken from "../utils/verifyToken.js";
import { useState } from "react";

export default function AuthRoutes() {
    const [token, setToken] = useState(verifyToken());

    const privateRouter = createBrowserRouter([
        {path: '/login', element: <Login verify={setToken}/>},
        {path: "/colt", element: <ColtHome />},
        {path: "/lab", element: <LabHome />}
    ]);

    const publicRouter = createBrowserRouter([
        {path: "/", element: <Navigate to="/login" />},
        {path: "/login", element: <Login verify={setToken} />}
    ]);

    return (
        <RouterProvider router={token ? privateRouter : publicRouter}/>
    );
}
