import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const findIcon = (iconKey: any): JSX.Element | undefined => {
    return <FontAwesomeIcon icon={iconKey}/>;
};

export { findIcon };
