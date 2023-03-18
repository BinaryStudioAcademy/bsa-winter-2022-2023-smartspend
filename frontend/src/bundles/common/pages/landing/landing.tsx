import {
    FirstStep,
    HighlightBanner,
    QuestionPart,
    SecondStep,
    ThirdStep
} from './components/components';

const Landing: React.FC = () => {
    return (
        <>
            <HighlightBanner />
            <QuestionPart question={'How to get your money into shape?'} />
            <FirstStep />
            <SecondStep />
            <ThirdStep />
        </>
    );
};

export { Landing };
