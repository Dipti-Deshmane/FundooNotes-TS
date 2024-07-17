import Login from '../Pages/login';
import Dashboard from '../Pages/Dashboard';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from '../Pages/signup';
import Trash from '../Components/Trash';
import Archive from '../Components/Archive';
import AuthRoute from './AuthRouter';
import ProtectedRoute from './ProtectedRouted';
const AppRouter = () => {
  
    return (
      <>
           <Routes>
        <Route path="/" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element ={<AuthRoute><SignUp /></AuthRoute>} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path='/Archive' element={<ProtectedRoute><Archive /></ProtectedRoute>} />
        <Route path='/Trash' element={<ProtectedRoute><Trash /></ProtectedRoute>} />
    </Routes>
      </>
    );
  };
  export default AppRouter;