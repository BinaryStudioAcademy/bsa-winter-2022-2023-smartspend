import classNames from 'classnames';

import {
    DoughnutChartCartVariant,
    StepInfoPanelVariant,
} from '~/bundles/landing/enums/enums.js';

import { DoughnutChartCard, StepInfoPanel } from '../components.js';
import styles from './styles.module.scss';

const ThirdStepPart: React.FC = () => {
    const itemsList = [
        'Set smart budgets to help you not to overspend in chosen category.',
        'Know how much you can spend daily in order to stick to your budget.',
        'Save money for your future dreams.',
    ];

    return (
        <section id="budget" className={styles.body}>
            <div className={classNames('container', styles.container)}>
                <StepInfoPanel
                    step={3}
                    listItems={itemsList}
                    title={'Make your spending stress-free'}
                    variant={StepInfoPanelVariant.SECONDARY}
                />
                <div className={styles.chartCardsContainer}>
                    <div className={styles.chartCardTop}>
                        <DoughnutChartCard
                            variant={DoughnutChartCartVariant.PRIMARY}
                            transaction_type={'Salary'}
                            transaction_num={1}
                            transaction_sum={'+$4,365.00'}
                            title={'Period income'}
                            date={'Mar 01-31'}
                        />
                    </div>
                    <div className={styles.chartCardBottom}>
                        <DoughnutChartCard
                            variant={DoughnutChartCartVariant.SECONDARY}
                            transaction_type={'Food & Drink'}
                            transaction_num={2}
                            transaction_sum={'-$200'}
                            title={'Period income'}
                            date={'Mar 01-31'}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export { ThirdStepPart };
