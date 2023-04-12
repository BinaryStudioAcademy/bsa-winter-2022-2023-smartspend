import classNames from 'classnames';

import { InputType } from '~/bundles/common/enums/input-type.enum.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks.js';
import { Button, Input } from '~/bundles/landing/components/components.js';

import styles from './styles.module.scss';

type Properties = {
    title: string;
};

const DEFAULT_INPUT: { email: string } = {
    email: '',
};

const SubscriptionPart: React.FC<Properties> = ({ title }) => {
    const { control, errors, reset } = useAppForm<{ email: string }>({
        defaultValues: DEFAULT_INPUT,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            if (reset) {
                reset({ email: '' });
            }
        },
        [reset],
    );

    return (
        <section id="subscription" className={styles.body}>
            <div className={classNames('container', styles.container)}>
                <h1 className={styles.title}>{title}</h1>
                <form className={styles.form} onSubmit={handleFormSubmit}>
                    <div className={styles.formContainer}>
                        <Input
                            type={InputType.TEXT}
                            placeholder="Enter your email"
                            name="email"
                            control={control}
                            errors={errors}
                            labelClassName={styles.inputLabel}
                            inputClassName={styles.input}
                        />
                        <Button className={styles.button}>Subscribe</Button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export { SubscriptionPart };
