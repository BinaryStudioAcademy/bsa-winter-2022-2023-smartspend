import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Properties = {
    name: IconProp;
    size?: string;
};

const Icon: React.FC<Properties> = ({ name, size }) => {
    return <FontAwesomeIcon icon={name} fontSize={size} />;
};

export { Icon };
