import { getApi } from './apiEndpoints.js';

const verifyToken = () => {
    const token = localStorage.getItem('token');
    if (token) {
        getApi('verify')
            .then(() => {
                return true;
            })
            .catch(() => {
                localStorage.removeItem('token');
                return false;
            });
    }
    return false;
}

export default verifyToken;