import EmmaAvatar from '~/assets/img/emma-avatar.svg';
import JoanAvatar from '~/assets/img/joan-avatar.svg';
import JoyAvatar from '~/assets/img/joy-avatar.svg';

import {
    FeedbacksPart,
    FirstStepPart,
    Footer,
    Header,
    HighlightBanner,
    QuestionPart,
    SecondStepPart,
    SubscriptionPart,
    ThirdStepPart,
} from './components/components';
import { AppRoute } from './enums/enums';

const Landing: React.FC = () => {
    const tabsData = [
        { title: 'Transaction', to: '/ui/' },
        { title: 'Overview', to: '/ui/overview' },
        { title: 'Budget', to: '/ui/budget' },
        { title: 'Wallet Settings', to: '/ui/wallet-settings' },
    ];

    const tabsDashboard = [
        { title: 'Dashboard', to: AppRoute.DASHBOARD },
        { title: 'Budget', to: AppRoute.BUDGETS },
    ];

    const allTabsData = {
        dashboard: tabsDashboard,
        wallets: tabsData,
    };

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
    ];

    return (
        <>
            <Header dataTabs={allTabsData} />
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
                title={'Get monthly money tips and stay on top of your finance'}
            />
            <Footer />
        </>
    );
};

export { Landing };
