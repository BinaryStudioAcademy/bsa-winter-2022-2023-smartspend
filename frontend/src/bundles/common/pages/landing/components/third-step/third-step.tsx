import { DoughnutChartCard, StepInfoPanel } from '../components';
import styles from './styles.module.scss';

const ThirdStep: React.FC = () => {
    const itemsList = [
        'Set smart budgets to help you not to overspend in chosen category.',
        'Know how much you can spend daily in order to stick to your budget.',
        'Save money for your future dreams.',
    ];

    const firstDoughnutCategories = [
        {
            total: 100,
            color: 'background: linear-gradient(95.77deg, #00D7BD -14.06%, #03BFD9 101.51%)',
        },
    ];

    return (
        <div className={styles.container}>
            <StepInfoPanel
                step={3}
                listItems={itemsList}
                title={'Make your spending stress-free'}
            />
            <div>
                <DoughnutChartCard
                    type={'Salary'}
                    transaction={1}
                    categories={firstDoughnutCategories}
                    title={'Period income'}
                    date={'Mar 01-31'}
                />
            </div>
        </div>
    );
};

export { ThirdStep };
