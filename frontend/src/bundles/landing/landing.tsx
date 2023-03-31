import EmmaAvatar from '~/assets/img/emma-avatar.svg';
import JoanAvatar from '~/assets/img/joan-avatar.svg';
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
                'Easy to use, great design, sync option and has a very simple and nice-looking widget that makes it even easier to use.',
        },
        {
            name: 'Emma',
            src: EmmaAvatar,
            feedback:
                'Really loved this app. It helps me to analyse my expenses and income. The best thing is it indexes everything based on hash which helps to see the expenses at once.',
        },
        {
            name: 'Joan',
            src: JoanAvatar,
            feedback:
                'The fact that it is cross-platform has made my life easier. I am always in control of my finances.',
        },
        {
            name: 'Daniel',
            src: JoyAvatar,
            feedback:
                'I have tried other money-tracking apps before SmartSpend, but I choose to stick to this because of its simplicity and intuitive design.',
        },
        {
            name: 'Sophia',
            src: EmmaAvatar,
            feedback:
                'I am using this app for more than two years and could not be happier with the service I got.',
        },
        {
            name: 'Jacob',
            src: JoanAvatar,
            feedback:
                'The app works intuitively, it makes it super easy to control your money. It helps me to develop healthy spending habits.',
        },
    ];

    return (
        <>
            <div className={styles.wrapper}>
                <HighlightBanner
                    title={'The only app that gets your money into shape'}
                    details={
                        'Use SmartSpend to plan your budget and take control of finances'
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
