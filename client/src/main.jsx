import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CssBaseline } from "@mui/material"
import AuthRoutes from "./components/AuthRoutes.jsx";
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@emotion/react';


export const theme = createTheme({
  palette: {
    primary: {
        main: '#0c0e0b',
    },
    secondary: {
        main: '#73d645',
    },
    app: {
        main: '#0c0e0b',
        forest: '#2E644A',
        lime: '#73d645',
        spring: '#5ACB65',
        error: '#d32727'
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthRoutes />
    </ThemeProvider>
  </React.StrictMode>,
)
