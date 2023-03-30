import { Link } from 'react-router-dom';

import fbIcon from '~/assets/img/facebook-icon.svg';
import googleIcon from '~/assets/img/google-icon.svg';
import logoSmartSpend from '~/assets/img/logo-smartspend.svg';
import { getText } from '~/bundles/common/helpers/helpers.js';
import {
    useAppDispatch,
    useCallback,
    useLocation,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';

import { SignInForm, SignUpForm } from '../components/components.js';
import { AppRoute, AuthApiPath } from '../enums/enums.js';
import { actions as authActions } from '../store';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();

    const handleSignInSubmit = useCallback(
        (payload: UserSignInRequestDto): void => {
            void dispatch(authActions.signIn(payload));
        },
        [dispatch],
    );

    const handleSignUpSubmit = useCallback(
        (payload: UserSignUpRequestDto): void => {
            void dispatch(authActions.signUp(payload));
        },
        [dispatch],
    );

    const getScreen = (screen: string): React.ReactNode => {
        if (screen.includes(AppRoute.SIGN_IN)) {
            return <SignInForm onSubmit={handleSignInSubmit} />;
        }
        if (screen.includes(AppRoute.SIGN_UP)) {
            return <SignUpForm onSubmit={handleSignUpSubmit} />;
        }
        return null;
    };

    const authPath =
        pathname === AppRoute.SIGN_IN
            ? AuthApiPath.SIGN_UP
            : AuthApiPath.SIGN_IN;

    return (
        <div className={styles.authContainer}>
            <div className={styles.authWrap}>
                <Link to={AppRoute.ROOT} className={styles.logoLink}>
                    <div className={styles.authLogo}>
                        <img
                            className={styles.logoImg}
                            src={logoSmartSpend}
                            alt="logo"
                        />
                    </div>
                    <span className={styles.logoText}>SmartSpend</span>
                </Link>
                <div className={styles.authInside}>
                    <span className={styles.authRoundlarge}></span>
                    <span className={styles.authRoundsmall}></span>
                    <span className={styles.authRing}></span>
                    <div className={styles.authWrapper}>
                        <div className={styles.authContent}>
                            <div className={styles.authHeader}>
                                <h2 className={styles.headerTitle}>
                                    {getText(pathname, 'title')}
                                </h2>
                                <div className={styles.headerText}>
                                    <span>{getText(pathname, 'authText')}</span>
                                    <Link
                                        className={styles.headerLink}
                                        to={authPath}
                                    >
                                        {getText(pathname, 'authLink')}
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.authBody}>
                                {getScreen(pathname)}
                            </div>
                            <div className={styles.authFooter}>
                                <p className={styles.footerText}>
                                    {getText(pathname, 'footers')}
                                </p>
                                <div className={styles.authSocial}>
                                    <img
                                        className={styles.socialImg}
                                        src={googleIcon}
                                        alt="googleIcon"
                                    />
                                    <img
                                        className={styles.socialImg}
                                        src={fbIcon}
                                        alt="facebookIcon"
                                    />
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
