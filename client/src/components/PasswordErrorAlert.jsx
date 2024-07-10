import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert'

export default function PasswordErrorAlert({open, setOpen}) {
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    return (
          <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
            <Alert
              onClose={handleClose}
              icon={false}
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Errore durante il login. Assicurati che l'username e la password siano corretti.
            </Alert>
          </Snackbar>
      );
}