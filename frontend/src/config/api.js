const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const API_ENDPOINTS = {
    BASE_URL: `${API_BASE_URL}`,
    USER_BULK: `${API_BASE_URL}/api/v1/user/bulk`,
    USER_ME: `${API_BASE_URL}/api/v1/user/me`,
    USER_SIGNIN: `${API_BASE_URL}/api/v1/user/signin`,
    USER_SIGNUP: `${API_BASE_URL}/api/v1/user/signup`,
    ACCOUNT_BALANCE: `${API_BASE_URL}/api/v1/account/balance`,
    ACCOUNT_TRANSFER: `${API_BASE_URL}/api/v1/account/transfer`
};