import classNames from 'classnames';

import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useAppForm } from '~/bundles/common/hooks/hooks';

import { Button, Input } from '../components';
import styles from './styles.module.scss';

type Properties = {
    title: string;
};

const DEFAULT_INPUT: { email: string } = {
    email: '',
};

const SubscriptionPart: React.FC<Properties> = ({ title }) => {
    const { control, errors } = useAppForm<{ email: string }>({
        defaultValues: DEFAULT_INPUT,
    });

    return (
        <section id="subscription" className={styles.body}>
            <div className={classNames('container', styles.container)}>
                <h1 className={styles.title}>{title}</h1>
                <form className={styles.form}>
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
