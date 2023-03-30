import classNames from 'classnames';

import styles from './styles.module.scss';

type Properties = {
    question: string;
};

const QuestionPart: React.FC<Properties> = ({ question }) => {
    return (
        <section className={styles.container}>
            <div className={classNames('container', styles.container)}>
                <h1 className={styles.title}>{question}</h1>
            </div>
        </section>
    );
};

export { QuestionPart };
