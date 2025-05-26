import './App.css';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';

// Auth components
import Signup from './pages/auth/components/signup/Signup';
import Signin from './pages/auth/components/signin/Signin';
import AdminDashboard from './pages/admin/components/dashboard/AdminDashboard';
import CustomerDashboard from './pages/customer/components/dashboard/CustomerDashboard';

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
      
      {/* Cutomer Components */}
      <Route path='/customer/dashboard' element={<CustomerDashboard/>} />
    </Routes>
    </>
    
  );
}

export default App;
