import { FeedbackCard } from '../components';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    feedbacks: {
        name: string;
        src: string;
        feedback: string;
    }[];
};

const FeedbacksPart: React.FC<Properties> = ({ title, feedbacks }) => {
    return (
        <section className={styles.body}>
            <div className={styles.container}>
                <h1 className={styles.title}>{title}</h1>
                <div className={styles.carouselContainer}>
                    {feedbacks.map((feedback, index) => (
                        <FeedbackCard
                            name={feedback.name}
                            avatar_src={feedback.src}
                            feedback={feedback.feedback}
                            gradient_number={index + 1}
                            key={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { FeedbacksPart };
