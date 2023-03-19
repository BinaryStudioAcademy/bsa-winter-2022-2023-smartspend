import { StepInfoPanelVariant } from '../../enums/enums';
import { StepInfoPanel } from '../components';
import styles from './styles.module.scss';

const FirstStepPart: React.FC = () => {
    const listItems = [
        'Connect your bank accounts and all your transactions will get automatically imported to Spendee.',
        'Connect your crypto wallet and E-Wallet for complete overview of your cash flow.',
        'Add your cash expenses manually.'
    ];
    return (
        <section className={styles.container}>
            <StepInfoPanel
                variant={StepInfoPanelVariant.SECONDARY}
                title={'Track your cash flow'}
                listItems={listItems}
                step={1}
            />
            <div>
                {/* add there cards */}
            </div>
        </section>
    );
};

export { FirstStepPart };
