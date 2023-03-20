import passwordShown from '~/assets/img/eye.svg';
import passwordHidden from '~/assets/img/eye-slash.svg';
import { Button, Input } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import {
    InputLabel,
    InputPlaceholder,
    InputSize,
    InputType,
} from '~/bundles/common/enums/enums.js';
import {
    useAppForm,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
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

    const [eye, setEye] = useState({ password: false });
    const eyeIcons = {
        password: eye.password ? passwordShown : passwordHidden,
    };
    const togglePasswordVisibility = useCallback(() => {
        setEye((previous) => ({
            ...previous,
            password: !previous.password,
        }));
    }, []);

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <form onSubmit={handleFormSubmit}>
            <p className={styles.inputWrapper}>
                <Input
                    type={InputType.EMAIL}
                    label={InputLabel.EMAIL}
                    placeholder={InputPlaceholder.EMAIL}
                    name="email"
                    size={InputSize.MEDIUM}
                    control={control}
                    errors={errors}
                />
            </p>
            <p className={styles.inputWrapper}>
                <Input
                    type={eye.password ? InputType.TEXT : InputType.PASSWORD}
                    label={InputLabel.PASSWORD}
                    placeholder={InputPlaceholder.PASSWORD}
                    name="password"
                    size={InputSize.MEDIUM}
                    control={control}
                    errors={errors}
                />
                <img
                    className={styles.eye}
                    src={eyeIcons.password}
                    onClickCapture={togglePasswordVisibility}
                    alt="eye"
                />
            </p>
            <Button type={ButtonType.SUBMIT}>Log in</Button>
            <span>Or Log In With</span>
        </form>
    );
};

export { SignInForm };
