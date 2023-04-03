import { useCallback, useEffect, useRef } from 'react';

interface Properties {
    title: string;
    scrollToId: string;
    className: string;
}

const ScrollNavLink: React.FC<Properties> = ({
    title,
    scrollToId,
    className,
}) => {
    const linkReference = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((): void => {
        const element: HTMLElement | null = document.querySelector(scrollToId);

        if (element) {
            const elementTop =
                element.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top: elementTop, behavior: 'smooth' });
        }
    }, [scrollToId]);

    useEffect(() => {
        const reference = linkReference;

        reference.current?.addEventListener('click', handleClick);
        return () => {
            reference.current?.removeEventListener('click', handleClick);
        };
    }, [handleClick, scrollToId]);

    return (
        <div className={className} ref={linkReference}>
            {title}
        </div>
    );
};

export { ScrollNavLink };
