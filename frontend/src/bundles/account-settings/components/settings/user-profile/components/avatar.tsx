import { useCallback, useRef } from '~/bundles/common/hooks/hooks.js';

import styles from '../../styles.module.scss';

type Properties = {
    selectedFile: File | null;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Avatar: React.FC<Properties> = ({ selectedFile, handleFileChange }) => {
    const inputReference = useRef<HTMLInputElement>(null);

    const handleClick = useCallback((): void => {
        if (inputReference.current) {
            inputReference.current.click();
        }
    }, []);

    return (
        <div className={styles.avatar}>
            {selectedFile ? (
                <img
                    className={styles.avatarImage}
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected file"
                />
            ) : (
                <button
                    className={styles.noImage}
                    onClick={handleClick}
                    type="button"
                >
                    Upload image here
                    <input
                        type="file"
                        accept={'image/*'}
                        ref={inputReference}
                        hidden
                        onChange={handleFileChange}
                    />
                </button>
            )}
        </div>
    );
};

export { Avatar };
