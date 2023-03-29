import JoyAvatar from '~/assets/img/joy-avatar.svg';

import {
    FeedbacksPart,
    FirstStepPart,
    Footer,
    HighlightBanner,
    QuestionPart,
    SecondStepPart,
    SubscriptionPart,
    ThirdStepPart,
} from './components/components';
import styles from './styles.module.scss';

const Landing: React.FC = () => {
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
        <>
            <div className={styles.wrapper}>
                <HighlightBanner
                    title={'The only app that gets your money into shape'}
                    details={
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'
                    }
                />
                <QuestionPart question={'How to get your money into shape?'} />
                <FirstStepPart />
                <SecondStepPart />
                <ThirdStepPart />
                <FeedbacksPart
                    title={'Why people use SmartSpend'}
                    feedbacks={feedbacksArray}
                />
                <SubscriptionPart
                    title={
                        'Get monthly money tips and stay on top of your finance'
                    }
                />
            </div>
            <Footer />
        </>
    );
};

export { Landing };
