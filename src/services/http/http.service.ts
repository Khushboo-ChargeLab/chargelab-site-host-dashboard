const header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

const baseUrl = process.env.REACT_APP_EXTERNAL_API_URL;
const getBearerToken = () => '';

export const post = async (url: string, body: any) => {
    try {
        const request = await fetch(new URL(url, baseUrl).href, {
            method: 'POST',
            headers: {
                ...header,
                Authorization: `Bearer ${getBearerToken()}`,
            },
            body: JSON.stringify(body),
        });

        if (+request.status === 401) {
            return null;
        }

        if (request.ok) {
            return request.json();
        }
        throw new Error('Something went wrong');
    } catch (err) {
        console.log('err - ', err);
        return Promise.reject(err);
    }
};

export const get = async (url: string) => {
    try {
        const request = await fetch(new URL(url, baseUrl).href, {
            method: 'GET',
            headers: {
                ...header,
                Authorization: `Bearer ${getBearerToken()}`,
            },
        });

        if (request.ok) {
            return request.json();
        }
        throw new Error('Something went wrong');
    } catch (err) {
        console.log('err - ', err);
        return Promise.reject(err);
    }
};