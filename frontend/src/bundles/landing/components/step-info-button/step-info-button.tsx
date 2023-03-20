import classNames from 'classnames';

import { ButtonVariant, StepInfoButtonVariant } from '../../enums/enums';
import { Button } from '../components';
import styles from './styles.module.scss';

type Properties = {
    step: number;
    variant?: StepInfoButtonVariant;
};

const StepInfoButton: React.FC<Properties> = ({
    step,
    variant = StepInfoButtonVariant.PRIMARY,
}) => {
    const buttonClass = classNames(styles.step_button, styles[variant]);

    const buttonTextClass = classNames(
        styles.step_button_text,
        styles[variant],
    );
    return (
        <Button className={buttonClass} variant={ButtonVariant.PLAIN}>
            <span className={buttonTextClass}>Step {step}</span>
        </Button>
    );
};

export { StepInfoButton };
