import React, { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface Properties {
    to: string;
    title: string;
    scrollToId: string;
    className: string;
}

const ScrollNavLink: React.FC<Properties> = ({
    to,
    title,
    scrollToId,
    className,
}) => {
    const linkReference = useRef<HTMLAnchorElement>(null);

    const handleClick = useCallback(
        (event: MouseEvent): void => {
            // eslint-disable-next-line unicorn/prefer-query-selector
            const element = document.getElementById(scrollToId);

            if (element) {
                event.preventDefault();
                element.scrollIntoView({ behavior: 'smooth' });
            }
        },
        [scrollToId],
    );

    useEffect(() => {
        const reference = linkReference;

        reference.current?.addEventListener('click', handleClick);
        return () => {
            reference.current?.removeEventListener('click', handleClick);
        };
    }, [handleClick, scrollToId]);

    return (
        <Link to={to} className={className} ref={linkReference}>
            {title}
        </Link>
    );
};

export { ScrollNavLink };
