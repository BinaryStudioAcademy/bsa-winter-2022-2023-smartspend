import { type Language, type PrismTheme } from 'prism-react-renderer';
import Highlight, { defaultProps } from 'prism-react-renderer';
import github from 'prism-react-renderer/themes/github';

type Properties = {
    language?: Language;
    code: string;
    theme?: PrismTheme;
};

const CodeHighlight: React.FC<Properties> = ({
    language = 'tsx',
    code,
    theme = github,
}) => {
    return (
        <Highlight
            {...defaultProps}
            theme={theme}
            code={code}
            language={language}
        >
            {({
                className,
                style,
                tokens,
                getLineProps,
                getTokenProps,
            }): JSX.Element => (
                <pre className={className} style={style}>
                    {tokens.map((line, index) => (
                        <div
                            key={index}
                            {...getLineProps({ line, key: index })}
                        >
                            {line.map((token, key) => (
                                <span
                                    key={key}
                                    {...getTokenProps({ token, key })}
                                />
                            ))}
                        </div>
                    ))}
                </pre>
            )}
        </Highlight>
    );
};

export { CodeHighlight };
