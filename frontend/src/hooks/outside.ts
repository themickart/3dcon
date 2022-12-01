import { useState, useRef, useEffect } from 'react';

export default function useOutside(initialIsVisible: boolean) {
    const [isShow, setIsShow] = useState(initialIsVisible);
    const ref = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node))
            setIsShow(false);
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, []);
    return { ref, isShow, setIsShow };
}
