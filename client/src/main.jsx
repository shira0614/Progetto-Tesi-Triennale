import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CssBaseline } from "@mui/material"
import AuthRoutes from "./components/AuthRoutes.jsx";
import { createTheme, ThemeProvider } from '@mui/material/styles';


export const theme = createTheme({
  palette: {
    primary: {
        main: '#0c0e0b',
    },
    secondary: {
        main: '#73d645',
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
