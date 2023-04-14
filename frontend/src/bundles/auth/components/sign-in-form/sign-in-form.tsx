import { Button, Input } from '~/bundles/common/components/components.js';
import {
    AppDocumentTitles,
    ButtonSize,
    ButtonType,
    InputType,
} from '~/bundles/common/enums/enums.js';
import {
    useAppDocumentTitle,
    useAppForm,
    useCallback,
} from '~/bundles/common/hooks/hooks.js';
import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from '~/bundles/users/users.js';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (event: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    useAppDocumentTitle(AppDocumentTitles.LOG_IN);
    const { control, errors, handleSubmit, watch, trigger } =
        useAppForm<UserSignInRequestDto>({
            defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
            validationSchema: userSignInValidationSchema,
        });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            event_.preventDefault();
            void trigger();
            const email = watch('email');
            const password = watch('password');
            if (!email || !password) {
                return;
            }
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit, trigger, watch],
    );

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <p className={styles.inputWrapper}>
                <Input
                    type={InputType.EMAIL}
                    label="E-mail"
                    placeholder="E-mail address"
                    name="email"
                    control={control}
                    errors={errors}
                    inputClassName={styles.inputPages}
                />
            </p>
            <p className={styles.inputWrapper}>
                <Input
                    type={InputType.PASSWORD}
                    label="Password"
                    placeholder="Password"
                    name="password"
                    control={control}
                    errors={errors}
                    inputClassName={styles.inputPages}
                    eyeHidden
                />
            </p>
            <Button
                size={ButtonSize.CUSTOM}
                className={styles.button}
                type={ButtonType.SUBMIT}
            >
                Log In
            </Button>
        </form>
    );
};

export { SignInForm };
