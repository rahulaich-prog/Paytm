import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { API_ENDPOINTS } from '../config/api';

const BalanceContext = createContext();

export const useBalance = () => {
    const context = useContext(BalanceContext);
    if (!context) {
        throw new Error('useBalance must be used within a BalanceProvider');
    }
    return context;
};

export const BalanceProvider = ({ children }) => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const fetchBalance = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_ENDPOINTS.ACCOUNT_BALANCE, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setBalance(response.data.balance);
        } catch (error) {
            console.error('Balance fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user) {
            fetchBalance();
        }
    }, [user]);

    const updateBalance = (newBalance) => {
        setBalance(newBalance);
    };

    return (
        <BalanceContext.Provider value={{ balance, loading, fetchBalance, updateBalance, currentUser: user }}>
            {children}
        </BalanceContext.Provider>
    );
};