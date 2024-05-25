import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CssBaseline } from "@mui/material"
import AuthRoutes from "./components/AuthRoutes.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <CssBaseline />
      <AuthRoutes />
  </React.StrictMode>,
)
