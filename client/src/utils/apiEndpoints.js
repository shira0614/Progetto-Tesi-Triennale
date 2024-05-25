import env from 'react-dotenv';

async function getApi(endpoint) {
    try {
        const response = await fetch(`${env.BASE_URL}api/${endpoint}`, {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                'Authentication': localStorage.getItem('token'),
            },
        });
        const content = await response.json();

        if (!response.ok) {
            throw new Error(`Errore ${response.status}: ${content.message}`);
        }

        return content;
    } catch (e) {
        throw new Error(`${e.message}`);
    }
}

export { getApi };