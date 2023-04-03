import classNames from 'classnames';

import { StepInfoPanel } from '~/bundles/landing/components/components.js';
import { StepInfoPanelVariant } from '~/bundles/landing/enums/enums.js';
import { type DataObject } from '~/bundles/landing/types/types.js';

import { LineChartCard } from './components/components.js';
import styles from './styles.module.scss';

const SecondStepPart: React.FC = () => {
    const listItems = [
        'Analyze your finance with beautiful, simple and easy-to-understand graphics. No need for complicated Excel sheets.',
        'See where your money goes and where they come from every month.',
        'See whether you spend less than you earn in one place and on 1 tap.',
    ];

    const dataArray: DataObject[] = [
        { date: 'Mar 03,2023', value: 0 },
        { date: 'Mar 4,2023', value: 790 },
        { date: 'Mar 5,2023', value: 790 },
        { date: 'Mar 7,2023', value: 620 },
        { date: 'Mar 9,2023', value: 620 },
    ];

    return (
        <section id="analytics" className={styles.body}>
            <div className={classNames('container', styles.container)}>
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
                    title={'Understand your financial habits'}
                    listItems={listItems}
                    step={2}
                    variant={StepInfoPanelVariant.PRIMARY}
                />
            </div>
        </section>
    );
};

export { SecondStepPart };
