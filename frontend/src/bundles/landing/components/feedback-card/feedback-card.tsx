import classNames from 'classnames';

import styles from './styles.module.scss';

type Properties = {
    name: string;
    avatar_src: string;
    feedback: string;
    gradient_number?: number;
};

const getNumberToRange1to3 = (value: number): number => {
    return (((value % 3) + 3) % 3) + 1;
};

const FeedbackCard: React.FC<Properties> = ({
    name,
    avatar_src,
    feedback,
    gradient_number = 1,
}) => {
    const containerClass = classNames(
        styles.container,
        styles[`gradient_${getNumberToRange1to3(gradient_number)}`],
    );
    return (
        <div className={containerClass}>
            <p className={styles.feedback}>{feedback}</p>
            <div className={styles.userContainer}>
                <img src={avatar_src} alt={name} />
                <span className={styles.userName}>{name}</span>
            </div>
        </div>
    );
};

export { FeedbackCard };
