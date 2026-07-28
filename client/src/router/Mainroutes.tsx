import Dashboard from '@/pages/Dashboard';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Logout from '@/pages/Logout';
import Notfound from '@/pages/Notfound';
import Profile from '@/pages/Profile';
import { Route, Routes } from 'react-router';
import PrivateRoutes from './PrivateRoutes';

const Mainroutes = () => {
    return (
        <Routes>
            <Route path='/' element={
                <Landing />
            } />
            <Route path='/login' element={<Login />} />
            <Route path='/logout' element={<PrivateRoutes><Logout /></PrivateRoutes>} />
            <Route path='/dashboard' element={<PrivateRoutes><Dashboard /></PrivateRoutes>} />
            <Route path='/profile' element={<PrivateRoutes><Profile /></PrivateRoutes>} />
            <Route path='*' element={<Notfound />} />
        </Routes>
    )
}

export default Mainroutes