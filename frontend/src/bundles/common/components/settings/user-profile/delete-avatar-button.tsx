import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from '../styles.module.scss';

type Properties = {
    deleteFile: () => void;
};

const DeleteAvatarButton: React.FC<Properties> = ({ deleteFile }) => {
    return (
        <button
            type="button"
            className={styles.deleteAvatar}
            onClick={deleteFile}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    );
};

export { DeleteAvatarButton };
