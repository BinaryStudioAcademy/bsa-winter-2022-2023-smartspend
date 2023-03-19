import classNames from 'classnames';

import { StepInfoButtonVariant, StepInfoPanelVariant } from '../../enums/enums';
import { StepInfoButton } from '../components';
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
    const titleClass = classNames(styles.title, styles[variant]);

    const listItemClass = classNames(styles.list_item, styles[variant]);

    const stepButtonVariant =
        variant === StepInfoPanelVariant.PRIMARY
            ? StepInfoButtonVariant.PRIMARY
            : StepInfoButtonVariant.SECONDARY;

    return (
        <div className={styles.container}>
            <div>
                <StepInfoButton variant={stepButtonVariant} step={step} />
            </div>
            <h1 className={titleClass}>{title}</h1>
            <ul className={styles.list}>
                {listItems.map((item, index) => (
                    <li className={listItemClass} key={index}>
                        <span style={{ paddingLeft: 10 }}>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { StepInfoPanel };
