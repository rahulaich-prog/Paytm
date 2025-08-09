const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
    BASE_URL: `https://paytm-backend-1dsu.onrender.com`,
    USER_BULK: `https://paytm-backend-1dsu.onrender.com/api/v1/user/bulk`,
    USER_ME: `https://paytm-backend-1dsu.onrender.com/api/v1/user/me`,
    USER_SIGNIN: `https://paytm-backend-1dsu.onrender.com/api/v1/user/signin`,
    USER_SIGNUP: `https://paytm-backend-1dsu.onrender.com/api/v1/user/signup`,
    ACCOUNT_BALANCE: `https://paytm-backend-1dsu.onrender.com/api/v1/account/balance`,
    ACCOUNT_TRANSFER: `https://paytm-backend-1dsu.onrender.com/api/v1/account/transfer`
};
