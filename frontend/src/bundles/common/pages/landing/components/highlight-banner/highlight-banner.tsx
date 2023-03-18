import AppStoreIcon from '../../../../../../assets/img/app-store-icon.svg';
import GooglePlayIcon from '../../../../../../assets/img/google-play-icon.svg';
import LaptopPreview from '../../../../../../assets/img/laptop-preview.svg';
import { StoreButton } from '../components';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    details: string;
};

const HighlightBanner: React.FC<Properties> = ({ title, details }) => {
    return (
        <div className={styles.container}>
            <div className={styles.details_container}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <p className={styles.details}>
                    {details}
                </p>
                <div className={styles.buttons_container}>
                    <StoreButton
                        title={'Download on the'}
                        body={'App Store'}
                        iconPath={AppStoreIcon}
                        storeAlt={'app store'}
                    />
                    <StoreButton
                        title={'Download on the'}
                        body={'Google Play'}
                        iconPath={GooglePlayIcon}
                        storeAlt={'google play'}
                    />
                </div>
            </div>
            <img
                src={LaptopPreview}
                alt="laptop"
                width={'608'}
                height={'327'}
            />
        </div>
    );
};

export { HighlightBanner };
