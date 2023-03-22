import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRef } from 'react';

import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from '../styles.module.scss';

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
        // eslint-disable-next-line react/jsx-no-bind
        <button className={styles.uploadAvatar} onClick={handleClick}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} />
            <span className={styles.uploadAvatarText}>Upload avatar</span>
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

export { UploadAvatarButton };
