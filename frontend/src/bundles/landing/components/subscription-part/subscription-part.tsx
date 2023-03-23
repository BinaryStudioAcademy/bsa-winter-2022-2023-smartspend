import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useAppForm } from '~/bundles/common/hooks/hooks';

import { Button, Input } from '../components';
import styles from './styles.module.scss';

type Properties = {
    title: string;
};

const DEFAULT_INPUT: { note: string } = {
    //It needs to change
    note: '',
};

const SubscriptionPart: React.FC<Properties> = ({ title }) => {
    const { control, errors } = useAppForm<{ note: string }>({
        //It needs to change
        defaultValues: DEFAULT_INPUT,
    });

    return (
        <section className={styles.container}>
            <h1 className={styles.title}>{title}</h1>
            <form className={styles.form}>
                <Input
                    type={InputType.TEXT}
                    label="E-mail"
                    placeholder="Enter your email"
                    name="note"
                    control={control}
                    errors={errors}
                    className={styles.input}
                />
                <Button>Subscribe</Button>
            </form>
        </section>
    );
};

export { SubscriptionPart };
