import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

interface Properties {
    file?: File;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

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
                <FontAwesomeIcon icon={faCamera} />
            )}
            <input
                type="file"
                accept={'image/*'}
                ref={inputReference}
                hidden
                onChange={handleFileChange}
                className={styles.inputFile}
            />
        </button>
    );
};

export { TransactionImage };
