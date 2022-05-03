const header = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
};

export const setApiPrefix = (api: string) => {
  localStorage.setItem('DASHBOARD-API-PREFIX', api);
};
export const getBearerToken = () => localStorage.getItem('DASHBOARD-TOKEN') || '';
export const getApiPrefix = () => localStorage.getItem('DASHBOARD-API-PREFIX') || '';
const baseUrl = `${getApiPrefix()}/internal/core/v2/`;

export const post = async (url: string, body: any) => {
  try {
    const request = await fetch(new URL(url, baseUrl).href, {
      method: 'POST',
      headers: {
        ...header,
        accept: 'application/json',
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

/**
 * Used for calling an endpoint without the predefined base url eg:
 * /deployment/cognito => {"region": "us-east-1", "userPoolId": "us-east-1_S1aRqShe6", "clientId": "4ahk7m1g54kodg0e3c9qedv6vg"}
 * /deployment/api => {"apiUrlPrefix": "https://api-v2-dash.dev.chargelab.io"}
 * @param url
 */
export const httpRawGet = async (url: string) => {
  try {
    const getRequest = await fetch(`${url}`, {
      method: 'GET',
      headers: {
        ...header,
      },
    });

    if (getRequest.ok) {
      return getRequest.json();
    }
    throw new Error('Something went wrong');
  } catch (err) {
    console.log('err - ', err);
  }
};

export const getBlob = async (url: string, extraHeader?: {}) => {
  try {
    const request = await fetch(new URL(url, baseUrl).href, {
      method: 'GET',
      headers: {
        ...header,
        ...extraHeader,
        Authorization: `Bearer ${getBearerToken()}`,
      },
    });

    if (request.ok) {
      return request.blob();
    }
    throw new Error('Something went wrong');
  } catch (err) {
    console.log('err - ', err);
    return Promise.reject(err);
  }
};
