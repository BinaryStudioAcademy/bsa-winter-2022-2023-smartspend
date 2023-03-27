import Logo from '../../../../assets/img/logo.svg';
import styles from './styles.module.scss';

const Loader: React.FC = () => {
    return <img className={styles.spinner} src={Logo} alt="logo" />;
};

export { Loader };
