import styles from './styles.module.scss';

type Properties = {
    question: string;
};

const QuestionPart: React.FC<Properties> = ({ question }) => {
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>{question}</h1>
        </section>
    );
};

export { QuestionPart };
