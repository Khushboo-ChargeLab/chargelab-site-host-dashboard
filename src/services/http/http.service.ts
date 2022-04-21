const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const baseUrl = process.env.REACT_APP_EXTERNAL_API_URL;
const getBearerToken = () => 'BAU9T23JZEU_08DZTI-ZQ1BIGG4:9af838e3589d71034cbfdf11af9adc83ddde1882620b01c2841d5cd7b3fbb8f5';

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
        Authorization: `x-auth ${getBearerToken()}`,
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
