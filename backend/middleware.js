const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");
import { API_ENDPOINTS } from '../config/api';

// ... existing authMiddleware code

const handleTransfer = async () => {
    try {
        if (!amount || amount <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        
        const response = await axios.post(API_ENDPOINTS.ACCOUNT_TRANSFER, {
            to: id,
            amount
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        });
        
        if (response.data.message === "Transfer successful") {
            alert("Transfer completed successfully!");
            navigate("/dashboard");
        }
    } catch (error) {
        alert(error.response?.data?.message || "Transfer failed");
        console.error('Transfer error:', error);
    }
};



module.exports = {
    authMiddleware
}