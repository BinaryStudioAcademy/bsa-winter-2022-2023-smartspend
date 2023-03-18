import styles from './styles.module.scss';

type Properties = {
    icons: {
        src: string;
        alt: string;
    }[];
};

const FooterMediaIcons: React.FC<Properties> = ({ icons }) => {
    return (
        <div className={styles.social_media_icons}>
            {icons.map((icon, index) => (
                <img
                    key={index}
                    className={styles.social_media_icon}
                    src={icon.src}
                    alt={icon.alt}
                />
            ))}
        </div>
    );
};

export { FooterMediaIcons };
