import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

type Properties = {
    name: IconProp;
    width?: string;
};

const Icon: React.FC<Properties> = ({ name, width }) => {
    return <FontAwesomeIcon icon={name} width={width} />;
};

export { Icon };
