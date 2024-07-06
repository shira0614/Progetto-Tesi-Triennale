const BASE_URL = 'http://localhost:3000/';
import axios from "axios";

function handleUnauthorized(e) {
    if (e.response && e.response.status === 403) {
        localStorage.removeItem('username');
        localStorage.removeItem('role');
        return true;
    }
    return false;
}

async function getApi(endpoint) {
    try {
        const response = await axios.get(`${BASE_URL}api/${endpoint}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.status === 200) {
            throw new Error(`Errore ${response.status}: ${response.data.message}`);
        }

        return response.data;
    } catch (e) {
        if (!handleUnauthorized(e)) {
            throw new Error(`${e.message}`);
        }
    }
}

async function postApi(endpoint, body) {
    try {
        const response = await axios.post(`${BASE_URL}api/${endpoint}`, body, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.status === 200) {
            throw new Error(`Errore ${response.status}: ${response.data.message}`);
        }

        return response.data;
    } catch (e) {
        if (!handleUnauthorized(e)) {
            throw new Error(`${e.message}`);
        }
    }
}

async function putApi(endpoint, body) {
    try {
        const response = await axios.put(`${BASE_URL}api/${endpoint}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.status === 200) {
            throw new Error(`Errore ${response.status}: ${response.data.message}`);
        }

        return response.data;
    } catch (e) {
        if (!handleUnauthorized(e)) {
            throw new Error(`${e.message}`);
        }
    }
}

async function deleteApi(endpoint, id) {
    try {
        const response = await axios.delete(`${BASE_URL}api/${endpoint}/${id}`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.status === 200) {
            throw new Error(`Errore ${response.status}: ${response.data.message}`);
        }

        return response.data;
    } catch (e) {
        if (!handleUnauthorized(e)) {
            throw new Error(`${e.message}`);
        }
    }
}
export { getApi, putApi, postApi, deleteApi };