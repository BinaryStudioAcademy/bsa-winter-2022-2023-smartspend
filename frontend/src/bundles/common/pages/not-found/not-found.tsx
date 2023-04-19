import { Button } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppSelector,
    useCallback,
    useNavigate,
} from '~/bundles/common/hooks/hooks.js';

import styles from './styles.module.scss';

const NotFound: React.FC = () => {
    const { user } = useAppSelector((state) => state.users);
    const redirectRoute = user ? AppRoute.DASHBOARD : AppRoute.ROOT;
    const navigate = useNavigate();
    const onRedirect = useCallback(() => {
        navigate(redirectRoute);
    }, [navigate, redirectRoute]);
    return (
        <section className={styles.container}>
            <h1 className={styles.title}>Page Not Found</h1>
            <Button onClick={onRedirect}>Go to Home</Button>
        </section>
    );
};

export { NotFound };
