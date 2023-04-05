import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Properties = {
    name: IconProp;
};

const Icon: React.FC<Properties> = ({ name }) => {
    return <FontAwesomeIcon icon={name} />;
};

export { Icon };
