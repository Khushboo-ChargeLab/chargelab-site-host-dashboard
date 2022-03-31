import { useEffect } from 'react';

export const useOnClickOutside = (ref:any, callback?:Function) => {
    useEffect(() => {
        const handler = (event:any) => {
            if (!ref?.current?.contains(event.target)) {
                callback && callback();
            }
        };
        window.addEventListener('click', handler);
        return () => window.removeEventListener('click', handler);
    }, [callback, ref]);
};
