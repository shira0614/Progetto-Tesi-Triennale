import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from 'react'

const baseURL = 'http://localhost:3000'

export default function Login({verify}) {
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    useEffect(() => {
     localStorage.clear();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        fetch(`${baseURL}/api/user/login`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: data.get('username'),
                password: data.get('password')
            }),
        }).then((response) => response.json()).then((data) => {
            verify(data.success);
            if (!data.success) {
                alert("Email o password incorretti")
            } else {
                window.localStorage.setItem("token", data.token)
                window.localStorage.setItem("role", data.role)
                window.localStorage.setItem("username", data.username)
                navigate('/', {replace: true})
            }
        }).catch(e => {
            console.log(e)
        })
    };

    return (
        <>
            <Grid container component="main" sx={{ height: '100vh', width: '100vw' }}>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    className='leaf'
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: '#2E644A' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Accedi
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                sx={{ borderColor: '#0c0e0b'}}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                sx={{ borderColor: '#0c0e0b'}}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                color="primary"
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Accedi
                            </Button>
                            <Grid container>
                                    <Button color='primary' sx={{ mb: 2 }} onClick={() => {
                                        setOpen(true);
                                    }}>
                                        {"Non hai un account?"}
                                    </Button>
                                    <Collapse in={open}>
                                    <Alert severity="warning" action={
                                        <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size='small'
                                        onClick={() => {
                                            setOpen(false);
                                        }}
                                        >
                                        <CloseIcon fontSize="inherit" />
                                        </IconButton>
                                    }>
                                    Per la creazione di un account, rivolgiti a un responsabile.
                                    </Alert>
                                    </Collapse>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    );
}