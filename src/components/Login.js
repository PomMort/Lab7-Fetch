import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// TODO remove, this demo shouldn't need to reset the theme.



export default function Login() {
    const [user,setUser] = useState(localStorage.getItem('user'))
    if(user){
        
        window.location.replace("http://localhost:3000/");
    }
    
    


    const handleSubmit = (event) => {
        
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const passwordData = data.get('password');
        const  URL = `https://65321e684d4c2e3f333da188.mockapi.io/api/v1/staffs?email=${data.get('email')}`;
        axios.get(URL).then(
            response => {
                return response.data;
            })
            .then(data=> {
                const user = data[0];
                
                if(user === undefined || user.passWord !== passwordData){
                
                    toast.error("Email or Password invalid!!!")
                    return false;   
                }
                
                toast.success('Login successfully')
                localStorage.setItem('user', JSON.stringify(user));
                setTimeout(() => {
                    window.location.replace("http://localhost:3000/"); 
                }, 800);
                
                
            })
            
            .catch(error=>console.log(error.message));
            
    };

    return (


        <>
        {!user && (<Container component="main" maxWidth="xs">
        <ToastContainer />
        <CssBaseline />
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                />

                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>

            </Box>
        </Box>

    </Container>)}
        </>
        
    );
}

