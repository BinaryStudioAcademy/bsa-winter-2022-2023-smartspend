import { faEnvelope, faGasPump } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CategoriesSettings: React.FC = () => {
    return (
        <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <FontAwesomeIcon icon={faGasPump} />
        </div>
    );
};

export { CategoriesSettings };
