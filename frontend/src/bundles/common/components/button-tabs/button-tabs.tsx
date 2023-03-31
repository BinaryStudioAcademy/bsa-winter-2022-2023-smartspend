import { useCallback } from 'react';

import { ButtonTab } from './components/components';
import styles from './styles.module.scss';

type TabsData = {
    title: string;
    isActive: boolean;
    disabled: boolean;
};

type Properties = {
    tabsData: TabsData[];
    cursor?: string;
    onClick?(id: unknown): void;
};

const ButtonTabs: React.FC<Properties> = ({
    tabsData,
    cursor = 'default',
    onClick = (): void => void 0,
}) => {
    const handleClick = useCallback((id: unknown) => onClick(id), [onClick]);
    return (
        <nav className={styles.tabs}>
            {tabsData.map((item, index) => (
                <ButtonTab
                    cursor={cursor}
                    index={index}
                    key={index}
                    disabled={item.disabled}
                    label={item.title}
                    isActive={item.isActive}
                    onClick={handleClick}
                />
            ))}
        </nav>
    );
};

export { ButtonTabs };
