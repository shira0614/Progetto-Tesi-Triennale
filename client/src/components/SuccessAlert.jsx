import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SuccessAlert(props) {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        props.setOpen(false);
    };

    return (
            <Snackbar open={props.open} autoHideDuration={8000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="success"
                    sx={{ width: '100%' }}
                >
                    {props.message}
                </Alert>
            </Snackbar>
    );
}