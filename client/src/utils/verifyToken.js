import { getApi } from './apiEndpoints.js';

const verifyToken = () => {
    if (localStorage.length > 0) {
        const res = getApi("verify");
        return !res.error;
    } else {
        return false;
    }
}

export default verifyToken;