import { Link } from 'react-router-dom';

import fbIcon from '~/assets/img/facebook-icon.svg';
import googleIcon from '~/assets/img/google-icon.svg';
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

import { getAuthEndpointName } from '../../common/helpers/helpers';
import { SignInForm, SignUpForm } from '../components/components.js';
import { AppRoute, AuthApiPath, AuthEndpointName } from '../enums/enums.js';
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
        const path = getAuthEndpointName(screen);
        switch (path) {
            case AuthEndpointName.SIGN_IN: {
                return <SignInForm onSubmit={handleSignInSubmit} />;
            }
            case AuthEndpointName.SIGN_UP: {
                return <SignUpForm onSubmit={handleSignUpSubmit} />;
            }
            default: {
                return null;
            }
        }
    };

    return (
        <div className={styles.authContainer}>
            <div className={styles.authWrap}>
                <div className={styles.authLogo}>
                    <img className={styles.logoImg} src="" alt="logo" />
                </div>
                <div className={styles.authInside}>
                    <span className={styles.authRoundlarge}></span>
                    <span className={styles.authRoundsmall}></span>
                    <span className={styles.authRing}></span>
                    <div className={styles.authWrapper}>
                        <div className={styles.authContent}>
                            <div className={styles.authHeader}>
                                <h2 className={styles.headerText}>
                                    {getText(pathname, 'title')}
                                </h2>
                                <Link
                                    className={styles.headerLink}
                                    to={
                                        pathname === AppRoute.SIGN_IN
                                            ? AuthApiPath.SIGN_UP
                                            : AuthApiPath.SIGN_IN
                                    }
                                >
                                    {getText(pathname, 'header')}
                                </Link>
                            </div>
                            <div className={styles.authBody}>
                                {getScreen(pathname)}
                            </div>
                            <div className={styles.authFooter}>
                                <p className={styles.footerText}>
                                    {getText(pathname, 'footer')}
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
