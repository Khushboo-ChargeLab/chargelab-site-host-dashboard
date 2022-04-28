export const getPath = (path:string, params?:string) => {
    if (params) {
        Object.entries(params)?.forEach(([key, value]) => {
            path += `&${key}=${value}`;
        });
    }
    return path;
};