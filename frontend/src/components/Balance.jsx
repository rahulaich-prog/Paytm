import { useState, useEffect } from 'react';
import axios from 'axios';

export const Balance = () => {
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBalance();
    }, []);

    const fetchBalance = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setBalance(response.data.balance);
            setError('');
        } catch (error) {
            setError('Failed to fetch balance');
            console.error('Balance fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-lg font-semibold">Loading balance...</div>;
    }

    if (error) {
        return <div className="text-lg font-semibold text-red-500">{error}</div>;
    }

    return (
        <div className="flex items-center">
            <div className="font-bold text-lg">
                Your balance: ₹{balance.toLocaleString()}
            </div>
            <button 
                onClick={fetchBalance}
                className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
            >
                Refresh
            </button>
        </div>
    );
};