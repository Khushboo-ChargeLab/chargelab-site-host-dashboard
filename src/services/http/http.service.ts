const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

const baseUrl = process.env.REACT_APP_EXTERNAL_API_URL;
export const setApiPrefix = (api: string) => {
    localStorage.setItem('DASHBOARD-API-PREFIX', api);
};
export const getBearerToken = () => localStorage.getItem('DASHBOARD-TOKEN') || '';

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

export const get = async (url: string, timeout: number = 10000) => {
  return Promise.race([
    fetch(new URL(url, baseUrl).href, {
      method: 'GET',
      headers: {
        ...header,
        Authorization: `Bearer ${getBearerToken()}`,
      },
    }),
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), timeout);
    }),
  ])
    .then((response: any) => {
      if (response.ok) {
        return response.json();
      }
    })
    .catch((e) => {
      return Promise.reject(new Error(`err -:${e}`));
    });
};
