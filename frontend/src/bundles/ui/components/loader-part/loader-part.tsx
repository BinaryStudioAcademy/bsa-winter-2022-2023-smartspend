import { CodeHighlight, Loader } from '../components';

const codeExample = `
const LoaderExample: React.FC = () => {
    return <Loader />;
}
`;

const LoaderPart: React.FC = () => {
    return (
        <>
            <CodeHighlight code={codeExample} />
            <Loader />
        </>
    );
};

export { LoaderPart };
