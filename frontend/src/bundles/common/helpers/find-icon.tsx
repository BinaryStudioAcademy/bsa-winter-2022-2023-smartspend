import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const findIcon = (iconKey: string): JSX.Element | undefined => {
    return <FontAwesomeIcon icon={iconKey as IconProp} />;
};

export { findIcon };
