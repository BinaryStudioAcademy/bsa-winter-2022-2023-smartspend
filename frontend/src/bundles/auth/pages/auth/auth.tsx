import fbIcon from '~/assets/img/facebook-icon.svg';
import googleIcon from '~/assets/img/google-icon.svg';
import { Link } from '~/bundles/common/components/components.js';
import { AppRoute } from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/bundles/users/users.js';

import { SignInForm, SignUpForm } from '../../components/components.js';
import { AuthApiPath } from '../../enums/enums.js';
import { actions as authActions } from '../../store';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { dataStatus } = useAppSelector(({ auth }) => ({
        dataStatus: auth.dataStatus,
    }));
    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback((): void => {
        // handle sign in
    }, []);

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        switch (screen) {
            case AppRoute.SIGN_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AppRoute.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
        }

        return null;
    };

    return (
        <div className={styles.auth__container}>
            <div className={styles.auth__wrap}>
                <div className={styles.auth__logo}>
                    <img src="" alt="logo" />
                </div>
                <div className={styles.auth__inside}>
                    <span className={styles.auth__roundlarge}></span>
                    <span className={styles.auth__roundsmall}></span>
                    <span className={styles.auth__ring}></span>
                    <div className={styles.auth__wrapper}>
                        <div className={styles.auth__content}>
                            <div className={styles.auth__header}>
                                <h2 className={styles.header__text}>
                                    {pathname === AppRoute.SIGN_IN
                                        ? 'Log In'
                                        : pathname === AppRoute.SIGN_UP &&
                                          'Sign Up'}
                                </h2>
                                <Link
                                    to={
                                        pathname === AppRoute.SIGN_IN
                                            ? AuthApiPath.SIGN_UP
                                            : AuthApiPath.SIGN_IN
                                    }
                                >
                                    {pathname === AppRoute.SIGN_IN
                                        ? 'No account? Sign Up'
                                        : pathname === AppRoute.SIGN_UP &&
                                          'Have an account? Log in'}
                                </Link>
                            </div>
                            <div className={styles.auth__body}>
                                {getScreen(pathname)}
                            </div>
                            <div className={styles.auth__footer}>
                                <p className={styles.footer__text}>
                                    {pathname === AppRoute.SIGN_IN
                                        ? 'Or Log In with'
                                        : pathname === AppRoute.SIGN_UP &&
                                          'Or Sign Up with'}
                                </p>
                                <div className={styles.auth__social}>
                                    <img src={googleIcon} alt="googleIcon" />
                                    <img src={fbIcon} alt="facebookIcon" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Auth };
