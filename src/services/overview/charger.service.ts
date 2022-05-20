import { Charger } from '../../stores/types/sessions.interface';
import { get, patch } from '../http/http.service';
import { getUserScope } from '../authenticate/authenticate.service';
import { ChargerList } from '../../stores/types/chargers.interface';
import { getPath } from '../utils';

const API = 'chargers';

export const getChargers = async (params?: any): Promise<ChargerList> => {
    const path = getPath(`${API}?scope=${getUserScope()}`, params);

    const result = await get(path);
    return result;
};

export const getChargerDetail = async (id: string): Promise<ChargerList> => {
    const path = getPath(`${API}/${id}?scope=${getUserScope()}`);

    const result = await get(path);
    return result;
};

export const updateCharger = async (id: string, payload: any): Promise<any> => {
    const path = getPath(`${API}/${id}?scope=${getUserScope()}`);
    const result = await patch(path, payload);
    return result;
};