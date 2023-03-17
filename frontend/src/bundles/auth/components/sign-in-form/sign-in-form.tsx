import facebookLogo from '~/assets/img/facebook_icon.svg';
import googleLogo from '~/assets/img/google_icon.svg';
import { Button, Input } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from '~/bundles/users/users';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <div className={styles.wrapper_login}>
            <h3 className={styles.title}>Log in</h3>
            <span className={styles.login_signup}>
                No account? <a href="/sign-up">Sign Up</a>
            </span>
            <form onSubmit={handleFormSubmit}>
                <p className={styles.first}>
                    <Input
                        type="text"
                        label="E-Mail"
                        placeholder="Enter your email"
                        name="email"
                        control={control}
                        errors={errors}
                        className={styles.input}
                    />
                </p>
                <p className={styles.last}>
                    <Input
                        type="text"
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        control={control}
                        errors={errors}
                        className={styles.input}
                    />
                </p>
                <Button className={styles.button} type={ButtonType.SUBMIT}>
                    Log in
                </Button>
                <span>Or Log In With</span>
                <div>
                    <img src={googleLogo} alt="google" />
                    <img
                        src={facebookLogo}
                        width="48"
                        height="48"
                        alt="facebook"
                    />
                </div>
            </form>
        </div>
    );
};

export { SignInForm };
