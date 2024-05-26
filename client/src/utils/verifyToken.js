import { getApi } from './apiEndpoints.js';

const verifyToken = () => {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const username = localStorage.getItem('username');
        if (token && role) {
            getApi('verify')
                .then(() => {
                    resolve(true);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    localStorage.removeItem('username');
                    resolve(false);
                });
        } else {
            resolve(false);
        }
    });
}

export default verifyToken;