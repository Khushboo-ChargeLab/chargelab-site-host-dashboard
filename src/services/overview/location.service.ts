import { Location } from '../../stores/types';
import { get } from '../http/http.service';
import { getUserScope } from '../authenticate/authenticate.service';

export const getLocations = async (): Promise<Location[]> => {
    const { entities } = await get(`locations?scope=${getUserScope()}`);
    return entities;
};