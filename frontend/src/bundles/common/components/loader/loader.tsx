import Logo from '~/assets/img/logo.svg';

import styles from './styles.module.scss';

const Loader: React.FC = () => {
    return (
        <div className={styles.container}>
            <img className={styles.spinner} src={Logo} alt="logo" />
        </div>
    );
};

export { Loader };
