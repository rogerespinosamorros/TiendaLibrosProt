import './App.css';
import Header from './pages/header/Header';
import { Route, Routes } from 'react-router-dom';

// Auth components
import Signup from './pages/auth/components/signup/Signup';
import Signin from './pages/auth/components/signin/Signin';

function App() {
  return (
    <>
    <Header />
    <Routes>
      {/* Auth components */}
      <Route path='/register' element={<Signup />} />
      <Route path='/login' element={< Signin />} />
    </Routes>
    </>
    
  );
}

export default App;
