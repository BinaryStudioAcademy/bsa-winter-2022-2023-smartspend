import { ButtonVariant } from '../../enums/enums';
import { Button } from '../components';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    listItems: string[];
    step: number;
};

const StepInfoPanel: React.FC<Properties> = ({ title, listItems, step }) => {
    return (
        <div className={styles.container}>
            <div>
                <Button
                    className={styles.step_button}
                    variant={ButtonVariant.PLAIN}
                >
                    Step {step}
                </Button>
            </div>
            <h1 className={styles.title}>{title}</h1>
            <ul>
                {listItems.map((item, index) => (
                    <li className={styles.list_item} key={index}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { StepInfoPanel };
