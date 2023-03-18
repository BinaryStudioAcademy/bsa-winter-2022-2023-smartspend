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
            <HighlightBanner
                title={'The only app that gets your money into shape'} 
                details={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor'} 
            />
            <QuestionPart question={'How to get your money into shape?'} />
            <FirstStepPart />
            <SecondStepPart />
            <ThirdStepPart />
        </>
    );
};

export { Landing };
