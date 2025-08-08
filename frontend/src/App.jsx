import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BalanceProvider } from './context/BalanceContext';

function AppContent() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />
                } />
                <Route path="/signin" element={
                    isAuthenticated ? <Navigate to="/dashboard" /> : <Signin />
                } />
                <Route path="/dashboard" element={
                    isAuthenticated ? (
                        <BalanceProvider>
                            <Dashboard />
                        </BalanceProvider>
                    ) : <Navigate to="/signin" />
                } />
                <Route path="/send" element={
                    isAuthenticated ? (
                        <BalanceProvider>
                            <SendMoney />
                        </BalanceProvider>
                    ) : <Navigate to="/signin" />
                } />
                <Route path="/" element={<Navigate to="/dashboard" />} />
            </Routes>
        </BrowserRouter>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
