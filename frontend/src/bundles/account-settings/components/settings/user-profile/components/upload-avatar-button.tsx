import { useRef } from 'react';

import { Button } from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
} from '~/bundles/common/enums/enums.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

import styles from '../../styles.module.scss';

type Properties = {
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const UploadAvatarButton: React.FC<Properties> = ({ handleFileChange }) => {
    const inputReference = useRef<HTMLInputElement>(null);

    const handleClick = useCallback((): void => {
        if (inputReference.current) {
            inputReference.current.click();
        }
    }, []);

    return (
        <Button
            onClick={handleClick}
            size={ButtonSize.SMALL}
            variant={ButtonVariant.SECONDARY}
            type={ButtonType.BUTTON}
        >
            <span className={styles.uploadAvatarText}>Upload Avatar</span>
            <input
                type="file"
                accept={'image/*'}
                ref={inputReference}
                hidden
                onChange={handleFileChange}
                className={styles.inputFile}
            />
        </Button>
    );
};

export { UploadAvatarButton };
