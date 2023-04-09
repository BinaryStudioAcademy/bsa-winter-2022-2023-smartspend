import React from 'react';

import dumpIcon from '~/assets/img/dump-icon.svg';
import { Button } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

type Properties = {
    onDelete: () => void;
};

const ButtonsContainer: React.FC<Properties> = ({ onDelete }) => {
    return (
        <div className={styles.container}>
            <Button variant={ButtonVariant.PRIMARY}>Update Setting</Button>
            <Button variant={ButtonVariant.DELETE} onClick={onDelete}>
                <img
                    src={dumpIcon}
                    alt="icon"
                    className={styles.button_delete_icon}
                />
                Delete Wallet
            </Button>
        </div>
    );
};

export { ButtonsContainer };
