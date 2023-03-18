import classNames from 'classnames';

import { ButtonVariant, StepInfoPanelVariant } from '../../enums/enums';
import { Button } from '../components';
import styles from './styles.module.scss';

type Properties = {
    title: string;
    listItems: string[];
    step: number;
    variant?: StepInfoPanelVariant;
};

const StepInfoPanel: React.FC<Properties> = ({
    title,
    listItems,
    step,
    variant = StepInfoPanelVariant.PRIMARY,
}) => {
    const titleClass = classNames(
        styles.title,
        variant === StepInfoPanelVariant.PRIMARY
            ? styles.primary
            : styles.secondary,
    );

    const listItemClass = classNames(
        styles.list_item,
        variant === StepInfoPanelVariant.PRIMARY
        ? styles.primary
        : styles.secondary,
    );

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
            <h1 className={titleClass}>{title}</h1>
            <ul>
                {listItems.map((item, index) => (
                    <li className={listItemClass} key={index}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { StepInfoPanel };
