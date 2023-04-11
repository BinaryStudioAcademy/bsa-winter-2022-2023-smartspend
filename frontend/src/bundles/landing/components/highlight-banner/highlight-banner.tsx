import classNames from 'classnames';

import InstallAppIcon from '~/assets/img/install-app.svg';
import LaptopPreview from '~/assets/img/laptop-preview.svg';

import { StoreButton } from './components/components.js';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    details: string;
};

const HighlightBanner: React.FC<Properties> = ({ title, details }) => {
    return (
        <section id="app" className={styles.body}>
            <div className={classNames('container', styles.container)}>
                <span className={styles.pinkCircle}></span>
                <span className={styles.violetCircle}></span>
                <span className={styles.blueCircle}></span>
                <div className={styles.detailsContainer}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.details}>{details}</p>
                </div>
                <div className={styles.laptopImgWrapper}>
                    <img
                        src={LaptopPreview}
                        alt="laptop"
                        className={styles.laptopImg}
                    />
                </div>
                <div className={styles.buttonsContainer}>
                    <StoreButton
                        iconPath={InstallAppIcon}
                        storeAlt={'install app'}
                    />
                </div>
            </div>
        </section>
    );
};

export { HighlightBanner };
