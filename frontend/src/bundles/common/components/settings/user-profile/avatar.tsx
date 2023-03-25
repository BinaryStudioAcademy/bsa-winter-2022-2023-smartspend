import styles from '../styles.module.scss';

type Properties = {
    selectedFile: File | null;
};
const Avatar: React.FC<Properties> = ({ selectedFile }) => {
    return (
        <div className={styles.avatar}>
            {selectedFile ? (
                <img
                    className={styles.avatarImage}
                    src={URL.createObjectURL(selectedFile)}
                    alt="Selected file"
                />
            ) : (
                <span className={styles.noImage}>Upload image here</span>
            )}
        </div>
    );
};

export { Avatar };
