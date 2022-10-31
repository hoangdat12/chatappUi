import { useState, useEffect } from 'react';

function useDebounce(value) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), 500);

        return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
}

export default useDebounce;