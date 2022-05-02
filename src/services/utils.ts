export const getPath = (path:string, params?:string) => {
    if (params) {
        Object.entries(params)?.forEach(([key, value]) => {
            path += `&${key}=${value}`;
        });
    }
    return path.replaceAll('[', '%5B').replaceAll(']', '%5D');
};