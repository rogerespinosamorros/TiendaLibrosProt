import { Avatar, Typography, Box, Container, Grid, CssBaseline, Button, CircularProgress, TextField, Link, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ROUTES from '../../../../utils/constants/routes';

import { useSnackbar } from 'notistack';
import { signin } from '../../services/auth';
import { isAdminLoggedIn, isUserLoggedIn, saveToken } from '../../../../utils/common';

const defaultTheme = createTheme();

export default function Signin() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    })
  };

  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    return regex.test(email);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      enqueueSnackbar("Introduce un email válido", { variant: 'warning' });
      return;
    }
    setLoading(true);
    try {
      const response = await signin(formData);
      if (response.status === 200) {
        console.log(response);
        const token = response.data.token;
        saveToken(token);
        if (isAdminLoggedIn())
          navigate(ROUTES.ADMIN.DASHBOARD);
        else if (isUserLoggedIn())
          navigate(ROUTES.CUSTOMER.DASHBOARD);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        enqueueSnackbar('Email o contraseña incorrectos', { variant: 'error' });
      } else {
        enqueueSnackbar('Error al iniciar sesión', { variant: 'error' });
      }
    } finally {
      setLoading(false);
    }
  };



  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box
          sx={{
            minHeight: "100vh",
            width: "100vw",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 0,
            background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
          }}
        >

          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 7,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',


              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign In
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={formData.email}
                  onChange={handleInputChange}
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
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={!formData.email || !formData.password}
                >
                  {loading ? <CircularProgress color="success" size={24} /> : 'Sign in'}
                </Button>
                <Grid container>
                  <Grid item>
                    <Link variant="body2" onClick={() => navigate(ROUTES.AUTH.REGISTER)}>
                      Don't have an account? Sign in
                    </Link>

                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Box>
      </ThemeProvider>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="succes" />
      </Backdrop>
    </>

  )
};