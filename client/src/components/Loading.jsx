import CircularProgress from '@mui/material/CircularProgress';
import DrawerAppBar from "./DrawerAppBar.jsx";

export default function Loading() {
    return (
        <>
            <DrawerAppBar />
            <CircularProgress color='forest'/>
        </>
    );
}