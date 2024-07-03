const BASE_URL = 'http://localhost:3000/';
import axios from "axios";

async function getApi(endpoint) {
    try {
        const response = await axios.get(`${BASE_URL}api/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
        });

        if (!response.status === 200) {
            throw new Error(`Errore ${response.status}: ${response.data.message}`);
        }

        return response.data;
    } catch (e) {
        throw new Error(`${e.message}`);
    }
}

async function postApi(endpoint, body) {
    try {
        const response = await axios.post(`${BASE_URL}api/${endpoint}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token'),
            },
        });

        if (!response.status === 200) {
            throw new Error(`Errore ${response.status}: ${response.data.message}`);
        }

        return response.data;
    } catch (e) {
        throw new Error(`${e.message}`);
    }
}

async function putApi(endpoint, body) {
    try {
        const response = await axios.put(`${BASE_URL}api/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });

        if (!response.status === 200) {
            throw new Error(`Errore ${response.status}: ${response.data.message}`);
        }

        return response.data;
    } catch (e) {
        throw new Error(`${e.message}`);
    }
}

async function deleteApi(endpoint, id) {
    try {
        const response = await axios.delete(`${BASE_URL}api/${endpoint}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'token': localStorage.getItem('token')
            },
        });

        if (!response.status === 200) {
            throw new Error(`Errore ${response.status}: ${response.data.message}`);
        }

        return response.data;
    } catch (e) {
        throw new Error(`${e.message}`);
    }
}
export { getApi, putApi, postApi, deleteApi };