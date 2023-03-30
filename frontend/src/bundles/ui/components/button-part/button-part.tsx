import { ButtonSize, ButtonVariant } from '../../enums/enums';
import { Button, CodeHighlight } from '../components';
import styles from './styles.module.scss';

const codeExample = `
const ButtonExample: React.FC = () => {
    return (
        <>
        <Button
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
        >
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.MEDIUM}
            disabled={true}
        >
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.MEDIUM}
        >
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.MEDIUM}
            disabled={true}
        >
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
        >
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            disabled={true}
        >
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
        >
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            disabled={true}
        >
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button variant={ButtonVariant.PLAIN} size={ButtonSize.SMALL}>
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button
            variant={ButtonVariant.PLAIN}
            size={ButtonSize.SMALL}
            disabled={true}
        >
            <span>+</span>
            <span>Button</span>
            <span>˅</span>
        </Button>
        <Button variant={ButtonVariant.ROUND}>+</Button>
        </>
    );
}

export { ButtonExample }
`;

const ButtonPart: React.FC = () => {
    return (
        <div className={'container'}>
            <CodeHighlight code={codeExample} />
            <div className={styles.buttonsContainer}>
                <Button
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.MEDIUM}
                >
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.MEDIUM}
                    disabled={true}
                >
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.MEDIUM}
                >
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.MEDIUM}
                    disabled={true}
                >
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button variant={ButtonVariant.PRIMARY} size={ButtonSize.SMALL}>
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button
                    variant={ButtonVariant.PRIMARY}
                    size={ButtonSize.SMALL}
                    disabled={true}
                >
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.SMALL}
                >
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button
                    variant={ButtonVariant.SECONDARY}
                    size={ButtonSize.SMALL}
                    disabled={true}
                >
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button variant={ButtonVariant.PLAIN} size={ButtonSize.SMALL}>
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button
                    variant={ButtonVariant.PLAIN}
                    size={ButtonSize.SMALL}
                    disabled={true}
                >
                    <span>+</span>
                    <span>Button</span>
                    <span>˅</span>
                </Button>
                <Button variant={ButtonVariant.ROUND}>+</Button>
            </div>
        </div>
    );
};

export { ButtonPart };
