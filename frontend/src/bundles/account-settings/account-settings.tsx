import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import { ButtonSize } from '~/bundles/common/enums/button-size.enum.js';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum.js';
import { FaIcons } from '~/bundles/common/enums/fa-icons.enum.js';

import { AppRoute } from '../common/enums/app-route.enum.js';
import { Button } from '../ui/components/components.js';
import { Tabs, UserProfile } from './components/components';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
    const dataTabs = [
        { title: 'Account', to: AppRoute.USER },
        { title: 'All Categories', to: AppRoute.DASHBOARD },
        { title: 'Connected bank accounts', to: AppRoute.DASHBOARD },
        { title: 'Support', to: AppRoute.DASHBOARD },
        { title: 'Terms and Policies', to: AppRoute.DASHBOARD },
    ];
    return (
        <main className={styles.container}>
            <Tabs tabsData={dataTabs} />
            <div>
                <div className={styles.userProfileContainer}>
                    <UserProfile />
                </div>
                <div className={styles.button}>
                    <Button
                        variant={ButtonVariant.DELETE}
                        size={ButtonSize.MEDIUM}
                    >
                        <FontAwesomeIcon
                            style={{
                                paddingRight: '5px',
                            }}
                            icon={FaIcons.TRASH_CAN}
                        />
                        <span>Delete Account</span>
                    </Button>
                </div>
            </div>
        </main>
    );
};

export { AccountSettings };
