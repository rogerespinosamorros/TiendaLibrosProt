import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './utils/constants/routes';

import { useEffect } from 'react';
import { isAdminLoggedIn, isUserLoggedIn } from '../src/utils/common';
import PrivateRoute from '../src/utils/privateRoute'

import Signup from '../src/pages/auth/components/signup/Signup';
import Signin from '../src/pages/auth/components/signin/Signin';

import AdminDashboard from './pages/admin/components/dashboard/AdminDashboard';
import PostBook from './pages/admin/components/post-book/PostBook';
import UpdateBook from './pages/admin/components/update-book/UpdateBook';
import ViewOrders from './pages/admin/components/view-orders/ViewOrders';
import CustomerProfile from './pages/customer/components/profile/CustomerProfile';

import CustomerDashboard from './pages/customer/components/dashboard/CustomerDashboard';
import Cart from './pages/customer/components/cart/Cart';
import MyOrders from './pages/customer/components/my-orders/MyOrders';
import Home from './Home';

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';

    window.onpopstate = () => {
      if (!isUserLoggedIn() && !isAdminLoggedIn()) {
        window.location.href = ROUTES.HOME;
      }
    };

    return () => {
      // Limpia el evento cuando el componente se desmonta
      window.onpopstate = null;
    };
  }, []);

  return (
    <>
      {/* Header component */}
      <Header />
      <Routes>
        {/* Home */}
        <Route path={ROUTES.HOME} element={<Home />} />
        {/* Auth */}
        <Route path={ROUTES.AUTH.REGISTER} element={<Signup />} />
        <Route path={ROUTES.AUTH.LOGIN} element={< Signin />} />

        {/* Admin */}
        <Route
          path={ROUTES.ADMIN.DASHBOARD}
          element={
            <PrivateRoute role="admin">
              <AdminDashboard />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.ADMIN.POST_BOOK} element={<PostBook />} />
        <Route path="/admin/book/:id/edit" element={<UpdateBook />} /> {/* ruta dinámica */}
        <Route path={ROUTES.ADMIN.ORDERS} element={<ViewOrders />} />

        {/* Customer */}
        <Route
          path={ROUTES.CUSTOMER.DASHBOARD}
          element={
            <PrivateRoute role="customer">
              <CustomerDashboard />
            </PrivateRoute>
          }
        />
        <Route path={ROUTES.CUSTOMER.CART} element={<Cart />} />
        <Route path={ROUTES.CUSTOMER.ORDERS} element={<MyOrders />} />

        <Route
          path={ROUTES.CUSTOMER.PROFILE}
          element={
            <PrivateRoute role="customer">
              <CustomerProfile />
            </PrivateRoute>
          }
        />


      </Routes>
    </>
  );
}


export default App;
