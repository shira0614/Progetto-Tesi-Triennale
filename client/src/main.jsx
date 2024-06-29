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
        main: '#ffffff',
    },
    forest: {
        main: '#2E644A',
        secondary: '#3d8864'
    },
      lime: {
        main: '#73d645'
      },
      spring: {
        main: '#5ACB65'
      },
      error: {
        main: '#d32727'
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
