import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { isAdminLoggedIn, isUserLoggedIn, removeToken } from '../../utils/common';
import ROUTES from '../../utils/constants/routes';


export default function Header() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCustomer, setIsCustomer] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserRoles = async () => {
      try {
        const isAdmin = await isAdminLoggedIn();
        const isCustomer = await isUserLoggedIn();
        setIsAdmin(isAdmin);
        setIsCustomer(isCustomer);
      } catch (error) {
        console.error(`Error fetching user role: ${error}`);
      }
    };
    fetchUserRoles();
  }, [location]);

  const handleLogout = () => {
    removeToken();
    navigate(ROUTES.HOME);
  };

  return (
    <>
      {!isCustomer && !isAdmin && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Tienda de Libros
              </Typography>
              <Button component={Link} to={ROUTES.AUTH.LOGIN} color="inherit">Login</Button>
              <Button component={Link} to={ROUTES.AUTH.REGISTER} color="inherit">Register</Button>

            </Toolbar>
          </AppBar>
        </Box>
      )}

      {isAdmin && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Administrator
              </Typography>
              <Button component={Link} to={ROUTES.ADMIN.DASHBOARD} color="inherit">Dashboard</Button>
              <Button component={Link} to={ROUTES.ADMIN.POST_BOOK} color="inherit">Post Book</Button>
              <Button component={Link} to={ROUTES.ADMIN.ORDERS} color="inherit">Orders</Button>

              <Button onClick={handleLogout} color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}

      {isCustomer && (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>

              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Tienda de Libros - Customer-User
              </Typography>

              <Button component={Link} to={ROUTES.CUSTOMER.DASHBOARD} color="inherit">Dashboard</Button>
              <Button component={Link} to={ROUTES.CUSTOMER.CART} color="inherit">Cart</Button>
              <Button component={Link} to={ROUTES.CUSTOMER.ORDERS} color="inherit">My Orders</Button>

              {/*  Nuevo botón: Perfil */}
              <Button component={Link} to={ROUTES.CUSTOMER.PROFILE} color="inherit">My Profile</Button>

              <Button onClick={handleLogout} color="inherit">Logout</Button>
            </Toolbar>
          </AppBar>
        </Box>
      )}

    </>
  )
};


