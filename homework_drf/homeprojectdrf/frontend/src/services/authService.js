import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/';

const authService = {
    login: async (username, password) => {
        const response = await axios.post(API_URL + 'token/', {
            username,
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data.access) {
            const userData = {
                ...response.data,
                username: username
            };
            localStorage.setItem('user', JSON.stringify(userData));
            return userData;
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('user');
    },

    getCurrentUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
};

export default authService;