import { Navigate } from 'react-router-dom';
import { isUserLoggedIn, isAdminLoggedIn } from './common';
import ROUTES from './constants/routes';


const PrivateRoute = ({children, role = 'any' }) => {
    const isLoggedIn = 
        role === 'admin' ? isAdminLoggedIn() :
        role === 'customer' ? isUserLoggedIn() :
        isUserLoggedIn() || isAdminLoggedIn();

    return isLoggedIn ? children : <Navigate to={ROUTES.HOME} replace />

};

export default PrivateRoute;