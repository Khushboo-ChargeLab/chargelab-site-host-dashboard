const header = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
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

export const getBearerToken = () =>
  localStorage.getItem('DASHBOARD-TOKEN') || '';

export const setApiPrefix = (api: any) => {
  localStorage.setItem('DASHBOARD-API-PREFIX', JSON.stringify(api));
};

export const getApiPrefix = async () => {
  if (!localStorage.getItem('DASHBOARD-API-PREFIX')) {
    const apiPrefix = await httpRawGet(
      `/deployment/api?hostname=${window.location.hostname}`,
    );
    setApiPrefix(apiPrefix);
    return apiPrefix;
  }
  let api;
  try {
    const item = localStorage.getItem('DASHBOARD-API-PREFIX');
    api = JSON.parse(item || '');
    // eslint-disable-next-line no-empty
  } catch (e) {}

  return api || {};
};

const baseUrl = async () => {
  const api = await getApiPrefix();
  return `${api.apiUrlPrefix}/internal/core/v2/`;
};

export const post = async (url: string, body: any): Promise<any> => {
  try {
    const request = await fetch(new URL(url, await baseUrl()).href, {
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

export const get = async (url: string): Promise<any> => {
  try {
    const request = await fetch(new URL(url, await baseUrl()).href, {
      method: 'GET',
      headers: {
        ...header,
        Authorization: `Bearer ${getBearerToken()}`,
      },
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

export const getBlob = async (url: string, extraHeader?: {}): Promise<any> => {
  try {
    const request = await fetch(new URL(url, await baseUrl()).href, {
      method: 'GET',
      headers: {
        ...header,
        ...extraHeader,
        Authorization: `Bearer ${getBearerToken()}`,
      },
    });

    if (+request.status === 401) {
      return null;
    }

    if (request.ok) {
      return request.blob();
    }
    throw new Error('Something went wrong');
  } catch (err) {
    console.log('err - ', err);
    return Promise.reject(err);
  }
};

export const patch = async (url: string, body: any): Promise<any> => {
  try {
    const request = await fetch(new URL(url, await baseUrl()).href, {
      method: 'PATCH',
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
      return request;
    }
    throw new Error('Something went wrong');
  } catch (err) {
    console.log('err - ', err);
    return Promise.reject(err);
  }
};
