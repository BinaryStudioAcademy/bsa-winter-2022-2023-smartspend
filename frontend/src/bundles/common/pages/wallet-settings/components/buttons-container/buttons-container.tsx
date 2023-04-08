import React from 'react';

import dumpIcon from '~/assets/img/dump-icon.svg';
import { Button } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';

import styles from './styles.module.scss';

const ButtonsContainer: React.FC = () => {
    return (
        <div className={styles.container}>
            <Button variant={ButtonVariant.PRIMARY}>Update Setting</Button>
            <Button variant={ButtonVariant.DELETE}>
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
