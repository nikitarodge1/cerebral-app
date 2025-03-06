import axios from "axios";

// User services
const register = async (userData) => {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return response.data;
  };
  
const login = async (userData) => {
    // Bypass for trial account
    if (userData.username === 'trial' && userData.password === 'assignment123') {
        return {
            user: { username: 'trial', role: 'trial' },
            token: 'trial-token'
        };
    }
    
    const response = await axios.post(`${API_URL}/users/login`, userData);
    return response.data;
};

export default {
    register,
    login
};