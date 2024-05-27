import CircularProgress from '@mui/material/CircularProgress';
import {Box} from '@mui/material';

export default function Loading() {
    return (
        <>
            <Box className='window'>
                <Box className='main-content' sx={{
                    border: '3px solid',
                    borderColor: '#000000',
                    margin: '1rem',
                    borderRadius: '20px',
                    padding: '1rem',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CircularProgress />
                </Box>
            </Box>
        </>
    );
}