import { Routes, Route } from 'react-router-dom';

import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Logout } from './components/Logout/Logout';
import { Register } from './components/Register/Register';
import { AuthProvider } from './contexts/AuthContext';
import { AuthenticatedGuard } from './guards/AuthenticatedGuard';
import { UnAuthenticatedGuard } from './guards/UnAuthenticatedGuard';


function App() {
    return (
        <div>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={UnAuthenticatedGuard}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        
                    </Route>
                    <Route element={AuthenticatedGuard}>
                        <Route path="/logout" element={<Logout />} />

                    </Route>
                </Routes>
                <Footer />
            </AuthProvider>
        </div>
    );
}

export default App;
