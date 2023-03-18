import {
    FirstStepPart,
    HighlightBanner,
    QuestionPart,
    SecondStepPart,
    ThirdStepPart
} from './components/components';

const Landing: React.FC = () => {
    return (
        <>
            <HighlightBanner />
            <QuestionPart question={'How to get your money into shape?'} />
            <FirstStepPart />
            <SecondStepPart />
            <ThirdStepPart />
        </>
    );
};

export { Landing };
