import styles from './styles.module.scss';

type Properties = {
    question: string;
};

const QuestionPart: React.FC<Properties> = ({ question }) => {
    return (
        <div className={styles.container} >
            <h1 className={styles.title} >{question}</h1>
        </div>
    );
};

export { QuestionPart };
