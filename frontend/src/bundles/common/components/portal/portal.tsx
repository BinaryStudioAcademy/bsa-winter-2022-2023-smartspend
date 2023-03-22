import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

import styles from './styles.module.scss';

type Properties = {
    children: React.ReactNode;
};

const Portal: React.FC<Properties> = ({ children }) => {
    const portalContainer = useMemo(() => {
        const element = document.createElement('div');
        element.classList.add(styles.portal);
        return element;
    }, []);

    useEffect(() => {
        const wasOverflowHidden = document.body.classList.contains(
            styles.noOverflow,
        );
        document.body.append(portalContainer);
        document.body.classList.add(styles.noOverflow);
        return () => {
            portalContainer.remove();
            if (!wasOverflowHidden) {
                document.body.classList.remove(styles.noOverflow);
            }
        };
    }, [portalContainer]);

    return ReactDOM.createPortal(children, document.body);
};

export { Portal };
