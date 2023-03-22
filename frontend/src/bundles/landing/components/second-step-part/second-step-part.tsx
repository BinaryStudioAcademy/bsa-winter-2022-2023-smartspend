import { StepInfoPanelVariant } from '../../enums/enums';
import { type DataObject } from '../../types/types';
import { LineChartCard, StepInfoPanel } from '../components';
import styles from './styles.module.scss';

const SecondStepPart: React.FC = () => {
    const listItems = [
        'Connect your bank accounts and all your transactions will get automatically imported to SmartSpend.',
        'Connect your crypto wallet and E-Wallet for complete overview of your cash flow.',
        'Add your cash expenses manually.',
    ];

    const dataArray: DataObject[] = [
        { date: 'Mar 03,2023', value: 0 },
        { date: 'Mar 4,2023', value: 790 },
        { date: 'Mar 5,2023', value: 790 },
        { date: 'Mar 7,2023', value: 620 },
        { date: 'Mar 9,2023', value: 620 },
    ];

    return (
        <section className={styles.container}>
            <span className={styles.bigBlueBorderCircle}></span>
            <span className={styles.smallBlueBorderCircle}></span>
            <span className={styles.bigBlueCircle}></span>
            <span className={styles.lightBlueCircle}></span>

            <LineChartCard
                dataArr={dataArray}
                title={'Account Balance'}
                date={'Mar 01-31'}
            />
            <StepInfoPanel
                title={'Track your cash flow'}
                listItems={listItems}
                step={2}
                variant={StepInfoPanelVariant.PRIMARY}
            />
        </section>
    );
};

export { SecondStepPart };
