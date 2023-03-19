import JoyAvatar from '../../../../../../assets/img/joy-avatar.svg';
import { FeedbackCard } from '../components';
import styles from './styles.module.scss';

const FeedbacksPart: React.FC = () => {
    const feedbacksArray = [
        {
            name: 'Roy',
            src: JoyAvatar,
            feedback:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras sed dui sagittis, scelerisque lectus at, porttitor lectus. Sed libero est, tincidunt eget purus nec, dignissim consequat mauris',
        },
        {
            name: 'Emma',
            src: JoyAvatar,
            feedback:
                'Nulla et nulla pulvinar, congue justo id, cursus ligula. Nunc pharetra sapien libero, vel blandit orci rhoncus ut. Sed aliquam efficitur semper.',
        },
        {
            name: 'Joan',
            src: JoyAvatar,
            feedback:
                'Nullam tempus, elit non tempus molestie, tellus diam sagittis urna, vel viverra velit risus in nunc. Cras in quam leo. Nullam mattis at lacus eget pretium. Etiam quis pulvinar',
        },
    ];
    return (
        <div className={styles.container}>
            {feedbacksArray.map((feedback, index) => (
                <FeedbackCard
                    name={feedback.name}
                    avatar_src={feedback.src}
                    feedback={feedback.feedback}
                    gradient_number={index + 1}
                    key={index}
                />
            ))}
        </div>
    );
};

export { FeedbacksPart };
