import classNames from 'classnames';

import styles from './styles.module.scss';

type Properties = {
    name: string;
    avatar_src: string;
    feedback: string;
    gradient_number?: number;
};

const FeedbackCard: React.FC<Properties> = ({
    name,
    avatar_src,
    feedback,
    gradient_number = 1,
}) => {
    const containerClass = classNames(
        styles.container,
        styles[`gradient_${gradient_number}`],
    );
    return (
        <div className={containerClass}>
            <p className={styles.feedback}>{feedback}</p>
            <div className={styles.user_container}>
                <img src={avatar_src} alt={name} />
                <span className={styles.user_name}>{name}</span>
            </div>
        </div>
    );
};

export { FeedbackCard };
