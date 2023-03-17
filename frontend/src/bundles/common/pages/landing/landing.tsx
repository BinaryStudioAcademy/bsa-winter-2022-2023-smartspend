import { LandingHeader } from '../../components/components';
import { type LinkProperties } from '../../types/nav-link.type';
import { FirstStep, HighlightBanner, QuestionPart, SecondStep } from './components/components';

const Landing: React.FC = () => {
    const links: LinkProperties[] = [
        { to: '/', value: 'PRICING' },
        { to: '/', value: 'BANK CONNECT' },
        { to: '/', value: 'HELP' },
        { to: '/', value: 'ABOUT US' },
        { to: '/sign-in', value: 'BLOG' },
        { to: '/ui', value: 'CONTACT' },
    ];
    return (
        <>
            <LandingHeader links={links} />
            <HighlightBanner />
            <QuestionPart question={'How to get your money into shape?'} />
            <FirstStep />
            <SecondStep />
        </>
    );
};

export { Landing };
