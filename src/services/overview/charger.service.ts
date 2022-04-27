import { Charger } from '../../stores/types/sessions.interface';
import { get } from '../http/http.service';

export const getChargers = async (): Promise<Charger[]> => {
    const { entities } = await get('chargers?scope=company');
    return entities;
};