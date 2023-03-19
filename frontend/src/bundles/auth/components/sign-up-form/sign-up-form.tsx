import passwordShown from '~/assets/img/eye.svg';
import passwordHidden from '~/assets/img/eye-slash.svg';
import { Button, Input } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

enum InputTypeValue {
    EMAIL = 'email',
    TEXT = 'text',
    PASSWORD = 'password',
}

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
        mode: 'onBlur',
    });
    const [eye, setEye] = useState({ password: false, confirm: false });

    const eyeIcons = {
        password: eye.password ? passwordShown : passwordHidden,
        confirm: eye.confirm ? passwordShown : passwordHidden,
    };

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    const togglePasswordVisibility = useCallback(
        (eyeType: keyof typeof eye) => {
            setEye((previous) => ({
                ...previous,
                [eyeType]: !previous[eyeType],
            }));
        },
        [],
    );

    const handleClickEye = useCallback(
        (eyeType: keyof typeof eye) => () => togglePasswordVisibility(eyeType),
        [togglePasswordVisibility],
    );

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <p>
                <Input
                    type={InputTypeValue.EMAIL}
                    label="E-mail"
                    placeholder="Enter your email"
                    name="email"
                    control={control}
                    errors={errors}
                    className={styles.input}
                />
            </p>
            <p>
                <Input
                    type={
                        eye.password
                            ? InputTypeValue.TEXT
                            : InputTypeValue.PASSWORD
                    }
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    control={control}
                    errors={errors}
                    className={styles.input}
                />
                <img
                    src={eyeIcons.password}
                    onClickCapture={handleClickEye('password')}
                    alt="eye"
                />
            </p>
            <p>
                <Input
                    type={
                        eye.confirm
                            ? InputTypeValue.TEXT
                            : InputTypeValue.PASSWORD
                    }
                    label="Confirm password"
                    placeholder="Confirm your password"
                    name="confirm"
                    control={control}
                    errors={errors}
                    className={styles.input}
                />
                <img
                    src={eyeIcons.confirm}
                    onClickCapture={handleClickEye('confirm')}
                    alt="eye"
                />
            </p>
            <Button type={ButtonType.SUBMIT}>Sign up</Button>
        </form>
    );
};

export { SignUpForm };
