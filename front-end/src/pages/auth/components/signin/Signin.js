import { Box, Container, Grid, CssBaseline, Button, CircularProgress, TextField, Link, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
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
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await signin(formData);
      if (response.status === 200) {
        console.log(response);
        const token = response.data.token;
        saveToken(token);
        if(isAdminLoggedIn())
          navigate('/admin/dashboard');
        else if(isUserLoggedIn())
          navigate('/customer/dashboard')
       }
    } catch (error) {
        enqueueSnackbar('Invalid credentials!', { variant: 'error', autoHideDuration: 3000 });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate('/register');
  }

  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 7,

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
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
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
                  <Link variant="body2" onClick={handleSignUpClick}>
                    Don't have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
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