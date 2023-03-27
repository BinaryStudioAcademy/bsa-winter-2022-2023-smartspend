import { Button } from '~/bundles/common/components/button/button';

import { AppRoute } from '../../enums/enums';
import { useCallback, useNavigate } from '../../hooks/hooks';
import styles from './styles.module.scss';

const NotFound: React.FC = () => {
    const navigate = useNavigate();
    const onRedirect = useCallback(() => {
        navigate(AppRoute.DASHBOARD);
    }, [navigate]);
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Page Not Found</h1>
            <Button onClick={onRedirect}>Go to Home</Button>
        </section>
    );
};

export { NotFound };
