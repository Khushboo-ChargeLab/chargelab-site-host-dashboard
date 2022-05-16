export const getPath = (path:string, params?:string) => {
    if (params) {
        Object.entries(params)?.forEach(([key, value]) => {
            path += `&${key}=${value}`;
        });
    }
    return path.replaceAll('[', '%5B').replaceAll(']', '%5D');
};

export const downloadCSV = (data: Blob, fileName: string) => {
    const a = document.createElement('a');
    a.download = `${fileName}.csv`;
    a.href = window.URL.createObjectURL(data);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };