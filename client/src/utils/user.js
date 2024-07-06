import { getApi } from './apiEndpoints.js';

export const getUser = async () => {
    if (localStorage.getItem('username') != null || localStorage.getItem('role') != null) {
        return { role: localStorage.getItem('role'), username: localStorage.getItem('username') };
    }
    try {
        const response = await getApi('user/info');
        if (response.success) {
            localStorage.setItem('username', response.username);
            localStorage.setItem('role', response.role);
            return { role: response.role, username: response.username };
        }
        return false;
    } catch {
        return false;
    }
}