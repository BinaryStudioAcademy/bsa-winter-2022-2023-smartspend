import eye from '~/assets/img/eye.svg';
import eye_slash from '~/assets/img/eye-slash.svg';
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

const showPassword = (): void => {
    const eyeSlash = document.querySelector('#eye_slash') as HTMLInputElement;
    const eyeVisible = document.querySelector('#eye') as HTMLInputElement;
    const inputType = document.querySelector('#input') as HTMLInputElement;

    if (inputType.type === 'password') {
        inputType.type = 'text';
        eyeVisible.style.display = 'block';
        eyeSlash.style.display = 'none';
    } else {
        inputType.type = 'password';
        eyeVisible.style.display = 'none';
        eyeSlash.style.display = 'block';
    }
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
                <p>
                    <Input
                        type="text"
                        label="E-Mail"
                        placeholder="Enter your email"
                        name="email"
                        control={control}
                        errors={errors}
                    />
                </p>
                <p>
                    <Input
                        id="input"
                        type="password"
                        label="Password"
                        placeholder="Enter your password"
                        name="password"
                        control={control}
                        errors={errors}
                    />
                    <span className={styles.eye} onClickCapture={showPassword}>
                        <img
                            id="eye"
                            src={eye}
                            alt="eye"
                            width="16"
                            height="14"
                            className={styles.hide1}
                        />
                        <img
                            id="eye_slash"
                            src={eye_slash}
                            alt="eye-slash"
                            width="17"
                            height="15"
                            className={styles.hide2}
                        />
                    </span>
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
