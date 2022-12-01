import { useEffect, useState } from 'react';

export default function useDebounce<T>(value: T, delay: number = 500) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
        () => () =>
            clearTimeout(setTimeout(() => setDebouncedValue(value), delay)),
        [value, delay]
    );
    return debouncedValue;
}
