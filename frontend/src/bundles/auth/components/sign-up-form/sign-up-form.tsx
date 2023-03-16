import fbIcon from '~/assets/img/facebook-icon.svg';
import googleIcon from '~/assets/img/google-icon.svg';
import { Button, Input, Link } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users';

import { AuthApiPath } from '../../enums/enums';
import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <div className={styles.signup__wrapper}>
            <div className="signup__content">
                <div className="signup__header">
                    <h2>Sign Up</h2>
                    <Link to={AuthApiPath.SIGN_IN}>Have an account? Log in</Link>
                </div>
                <form onSubmit={handleFormSubmit}>
                    <p>
                        <Input
                            type="text"
                            label="Email"
                            placeholder="Enter your email"
                            name="email"
                            control={control}
                            errors={errors}
                        />
                    </p>
                    <p>
                        <Input
                            type="text"
                            label="Password"
                            placeholder="Enter your password"
                            name="password"
                            control={control}
                            errors={errors}
                        />
                    </p>
                    <Button type={ButtonType.SUBMIT}>Sign up</Button>
                </form>
                <div className="singup__footer">
                    <p>Or Sign Up with</p>
                    <div className="singup__social">
                        <img src={googleIcon} alt="googleIcon" />
                        <img src={fbIcon} alt="facebookIcon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export { SignUpForm };
