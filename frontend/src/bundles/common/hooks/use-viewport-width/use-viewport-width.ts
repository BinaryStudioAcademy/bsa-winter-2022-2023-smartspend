import { useEffect, useState } from '../hooks.js';

const useViewportWidth = (): number => {
    const [viewportWidth, setViewportWidth] = useState<number>(
        window.innerWidth,
    );

    useEffect(() => {
        const handleResize = (): void => {
            setViewportWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return viewportWidth;
};

export { useViewportWidth };
