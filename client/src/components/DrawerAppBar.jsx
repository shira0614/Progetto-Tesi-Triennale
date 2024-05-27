import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {useEffect, useState} from "react";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import MarkEmailUnreadRoundedIcon from '@mui/icons-material/MarkEmailUnreadRounded';
import {ListItemIcon} from "@mui/material";
import {useLocation, useNavigate} from "react-router-dom";

const coltNav = [
    {path: '/', label: 'Home', icon: HomeRoundedIcon},
]
const labNav = [
    {path: '/', label: 'Home', icon: HomeRoundedIcon},
    {path: '/new', label: 'Notifiche', icon: MarkEmailUnreadRoundedIcon},
]

export default function DrawerAppBar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [username, setUsername] = useState('');
    const navItems = localStorage.getItem('role') === 'coltivatore' ? coltNav : labNav;
    const location = useLocation();
    const [selectedRoute, setSelectedRoute] = React.useState(location.pathname);
    const navigate = useNavigate();

    useEffect(() => {
        const route = navItems.find((route) => route.path === location.pathname);
        if (route) {
            setSelectedRoute(route.path);
        } else {
            setSelectedRoute('/');
        }
    }, [location, navItems]);

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                {username}
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding>
                        <ListItemButton
                            onClick={() => navigate(item.path)}
                            selected={selectedRoute === item.path}
                            sx={{
                                m: '0.5rem',
                                "&.Mui-selected": {
                                    backgroundColor: "#0c0e0b",
                                    borderRadius: "10px"
                                },
                                ":hover": {
                                    borderRadius: "10px"
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#262c23"
                                },
                            }}>
                            <ListItemIcon>
                                <item.icon sx={{color: (selectedRoute === item.path) ? 'white' : 'black'}}/>
                            </ListItemIcon>
                            <ListItemText primary={item.label}
                                          sx={{color: (selectedRoute === item.path) ? 'white' : 'black'}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar component="nav" sx={{ height: '10vh', pt: '1vh', bgcolor: '#0c0e0b' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        {username}
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item.label}
                                    onClick={() => navigate(item.path)}
                                    sx={{ color: '#fff', m: '0.5rem' ,
                                        bgcolor: selectedRoute === item.path ? '#000000' : '#0c0e0b',
                                "&:hover": {
                                    backgroundColor: "#262c23",
                                    borderRadius: "10px"
                                },
                                "&.Mui-selected": {
                                    backgroundColor: "#000000",
                                    borderRadius: "10px"
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#262c23"
                                }
                            }}>
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}