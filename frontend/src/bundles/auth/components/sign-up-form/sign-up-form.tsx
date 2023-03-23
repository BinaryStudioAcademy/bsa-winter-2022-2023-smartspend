import { Button, Input } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import { InputType } from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';
import styles from './styles.module.scss';

type Properties = {
    onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignUpValidationSchema,
        mode: 'onBlur',
    });

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
        <form className={styles.form} onSubmit={handleFormSubmit}>
            <p className={styles.inputWrapper}>
                <Input
                    type={InputType.EMAIL}
                    label="E-mail"
                    placeholder="Enter your email"
                    name="email"
                    control={control}
                    errors={errors}
                    input_className={styles.input}
                />
            </p>
            <p className={styles.inputWrapper}>
                <Input
                    type={InputType.PASSWORD}
                    label="Password"
                    placeholder="Enter your password"
                    name="password"
                    control={control}
                    errors={errors}
                    input_className={styles.input}
                    eyeHidden
                />
            </p>
            <p className={styles.inputWrapper}>
                <Input
                    type={InputType.PASSWORD}
                    label="Confirm password"
                    placeholder="Confirm your password"
                    name="repeatPassword"
                    control={control}
                    errors={errors}
                    input_className={styles.input}
                    eyeHidden
                />
            </p>
            <Button type={ButtonType.SUBMIT}>Sign up</Button>
        </form>
    );
};

export { SignUpForm };
