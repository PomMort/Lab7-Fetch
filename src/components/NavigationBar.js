import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const drawerWidth = 240;
const navItems = ['Home', 'Dashboard', 'Contact'];

export default function NavigationBar(props) {

  const [user, setUser] = useState(localStorage.getItem('user'));


  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Logout successfully')

    setTimeout(() => {
      window.location.replace("http://localhost:3000/login");
    }, 800);

  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>

      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link to={item === 'Home' ? '/' : item} style={{textDecorationLine : 'none', color : 'black'}}>
              <ListItemButton href="#simple-list" sx={{ textAlign: 'center' }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </Link>

          </ListItem>
        ))}
      </List>
    </Box>
  );



  return (
    <Box sx={{ display: 'flex' }}>
      <ToastContainer />
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
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
            MUI
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Link to={item === 'Home' ? '/' : item}>
                <Button key={item} sx={{ color: '#fff' }}>
                  {item}
                </Button>
              </Link>

            ))}
            {user ? (<Button sx={{ color: '#fff' }} onClick={() => handleLogout()}>
              Logout
            </Button>) : (<Link to="/login" >
              <Button sx={{ color: '#fff' }}>
                Login
              </Button>
            </Link>)}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}