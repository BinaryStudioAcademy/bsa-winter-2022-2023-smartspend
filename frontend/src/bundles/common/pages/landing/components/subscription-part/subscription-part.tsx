import { Button, CreateInputNote } from '../components';
import styles from './styles.module.scss';

type Properties = {
    title: string;
};

const SubscriptionPart: React.FC<Properties> = ({ title }) => {
    return (
        <section className={styles.container} >
            <h1 className={styles.title} >{title}</h1>
            <form className={styles.form} >
                <CreateInputNote/>
                <Button>Subscribe</Button>
            </form>
        </section>
    );
};

export { SubscriptionPart };
