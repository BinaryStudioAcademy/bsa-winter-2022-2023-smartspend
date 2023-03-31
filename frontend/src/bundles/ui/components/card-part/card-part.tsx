import { CardVariant } from '../../enums/enums';
import { CardTotal, CodeHighlight } from '../components';
import styles from './styles.module.scss';

const codeExample = `
const CardExample: React.FC = () => {
    return (
    <>
        <CardTotal
            title="Total Balance Total Balance Total Balance Total Balance Total Balance"
            sum={40.45}
            variant={CardVariant.ORANGE}
        />
        <CardTotal
            title="Total Period Change"
            sum={504_000_000_000.549}
            variant={CardVariant.BLUE}
        />
        <CardTotal
            title="Total Period Expenses"
            sum={-9700.34}
            variant={CardVariant.WHITE}
        />
        <CardTotal
            title="Total Balance"
            sum={7600.34}
            variant={CardVariant.VIOLET}
        />
    </>
    );
}

export { CardExample };
`;

const CardPart: React.FC = () => {
    return (
        <div className={styles.container}>
            <CodeHighlight code={codeExample} />
            <div className={styles.cardTotalContainer}>
                <CardTotal
                    title="Total Balance Total Balance Total Balance Total Balance Total Balance"
                    sum={40.45}
                    variant={CardVariant.ORANGE}
                />
                <CardTotal
                    title="Total Period Change"
                    sum={504_000_000_000.549}
                    variant={CardVariant.BLUE}
                />
                <CardTotal
                    title="Total Period Expenses"
                    sum={-9700.34}
                    variant={CardVariant.WHITE}
                />
                <CardTotal
                    title="Total Balance"
                    sum={7600.34}
                    variant={CardVariant.VIOLET}
                />
            </div>
        </div>
    );
};

export { CardPart };
