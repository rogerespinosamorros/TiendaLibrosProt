import './App.css';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';


import Signup from './pages/auth/components/signup/Signup';
import Signin from './pages/auth/components/signin/Signin';
import AdminDashboard from './pages/admin/components/dashboard/AdminDashboard';
import CustomerDashboard from './pages/customer/components/dashboard/CustomerDashboard';
import PostBook from './pages/admin/components/post-book/PostBook';
import UpdateBook from './pages/admin/components/update-book/UpdateBook';
import ViewOrders from './pages/admin/components/view-orders/ViewOrders';

function App() {
  return (
    <>
    {/* Header component */}
    <Header />
    <Routes>
      {/* Auth components */}
      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={< Signin />} />

      {/* Admin Components */}
      <Route path= '/admin/dashboard' element={<AdminDashboard />} />
      <Route path= '/admin/book/post' element={<PostBook />} />
      <Route path= '/admin/book/:id/edit' element={<UpdateBook />} />
      <Route path= '/admin/orders' element={<ViewOrders />} />
      
      {/* Cutomer Components */}
      <Route path='/customer/dashboard' element={<CustomerDashboard/>} />
    </Routes>
    </>
    
  );
}

export default App;
