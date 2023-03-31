import { Button } from '~/bundles/common/components/components.js';

import styles from '../../styles.module.scss';

type Properties = {
    children: string;
    isChange: boolean;
};
const SubmitButton: React.FC<Properties> = ({ children, isChange }) => {
    return (
        <div className={styles.submitBtn}>
            <Button disabled={!isChange}>{children}</Button>
        </div>
    );
};

export { SubmitButton };
