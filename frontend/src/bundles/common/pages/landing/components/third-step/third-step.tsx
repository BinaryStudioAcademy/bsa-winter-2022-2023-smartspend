import { StepInfoPanel } from '../components';
import styles from './styles.module.scss';

const ThirdStep: React.FC = () => {
    const itemsList = [
        'Set smart budgets to help you not to overspend in chosen category.',
        'Know how much you can spend daily in order to stick to your budget.',
        'Save money for your future dreams.',
    ];

    return (
        <div className={styles.container}>
            <StepInfoPanel
                listItems={itemsList}
                title={'Make your spending stress-free'}
            />
        </div>
    );
};

export { ThirdStep };
