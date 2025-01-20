import { useState, useEffect } from 'react';

function useSessionStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            window.sessionStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        try {
            const item = window.sessionStorage.getItem(key);
            if (item) {
                setStoredValue(JSON.parse(item));
            }
        } catch (error) {
            console.error(error);
        }
    }, [key]);

    return [storedValue, setValue];
}

export default useSessionStorage;