import './portal.scss';

import { useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';

interface PortalProperties {
    children: React.ReactNode;
}

const Portal: React.FC<PortalProperties> = ({ children }) => {
    const portalContainer = useMemo(() => {
        const element = document.createElement('div');
        element.classList.add('portal');
        return element;
    }, []);

    useEffect(() => {
        const wasOverflowHidden =
            document.body.classList.contains('noOverflow');
        document.body.append(portalContainer);
        document.body.classList.add('noOverflow');
        return () => {
            portalContainer.remove();
            if (!wasOverflowHidden) {
                document.body.classList.remove('noOverflow');
            }
        };
    }, [portalContainer]);

    return ReactDOM.createPortal(children, portalContainer);
};

export { Portal };
