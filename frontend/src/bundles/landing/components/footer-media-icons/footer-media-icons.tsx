import styles from './styles.module.scss';

type Properties = {
    icons: {
        src: string;
        alt: string;
        href: string;
    }[];
};

const FooterMediaIcons: React.FC<Properties> = ({ icons }) => {
    return (
        <div className={styles.icons}>
            {icons.map((icon, index) => (
                <a
                    href={icon.href}
                    target="_blank"
                    rel="noreferrer"
                    key={index}
                >
                    <img
                        className={styles.icon}
                        src={icon.src}
                        alt={icon.alt}
                    />
                </a>
            ))}
        </div>
    );
};

export { FooterMediaIcons };
