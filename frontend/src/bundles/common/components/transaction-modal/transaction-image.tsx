import { useRef } from 'react';

import cameraIcon from '~/assets/img/camera-icon.svg';
import { FileInput } from '~/bundles/common/components/file-input/file-input';
import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    file?: File;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TransactionImage: React.FC<Properties> = ({ file, handleFileChange }) => {
    const inputReference = useRef<HTMLInputElement>(null);

    const handleClick = useCallback((): void => {
        if (inputReference.current) {
            inputReference.current.click();
        }
    }, []);

    return (
        <button
            type="button"
            className={styles.imageButton}
            onClick={handleClick}
        >
            {file ? (
                <img
                    className={styles.image}
                    src={URL.createObjectURL(file)}
                    alt="transaction"
                />
            ) : (
                <img src={cameraIcon} alt="camera-icon" />
            )}
            <input
                type="file"
                accept={'image/*'}
                ref={inputReference}
                hidden
                onChange={handleFileChange}
            />
            <FileInput
                ref={inputReference}
                handleFileChange={handleFileChange}
                accept={'image/*'}
            />
        </button>
    );
};

export { TransactionImage };
