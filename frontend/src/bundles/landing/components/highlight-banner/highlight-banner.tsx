import classNames from 'classnames';

import AppStoreIcon from '~/assets/img/app-store-icon.svg';
import GooglePlayIcon from '~/assets/img/google-play-icon.svg';
import LaptopPreview from '~/assets/img/laptop-preview.svg';

import { StoreButton } from '../components';
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
                        url={'https://www.apple.com/app-store/'}
                        title={'Download on the'}
                        body={'App Store'}
                        iconPath={AppStoreIcon}
                        storeAlt={'app store'}
                    />
                    <StoreButton
                        url={'https://play.google.com/'}
                        title={'Download on the'}
                        body={'Google Play'}
                        iconPath={GooglePlayIcon}
                        storeAlt={'google play'}
                    />
                </div>
            </div>
        </section>
    );
};

export { HighlightBanner };
