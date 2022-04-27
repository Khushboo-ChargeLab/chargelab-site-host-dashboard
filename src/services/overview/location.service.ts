import { Location } from '../../stores/types';
import { get } from '../http/http.service';

export const getLocations = async (): Promise<Location[]> => {
    const { entities } = await get('locations?scope=company');
    return entities;
};