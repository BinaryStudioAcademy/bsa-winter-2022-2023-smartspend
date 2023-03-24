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
    const { control, errors, handleSubmit, reset } =
        useAppForm<UserSignUpRequestDto>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignUpValidationSchema,
            mode: 'onBlur',
        });

    const inputReset = reset;

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
            inputReset && reset();
        },
        [handleSubmit, inputReset, onSubmit, reset],
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
            <p className={styles.inputWrapper}>
                <Input
                    type={InputType.PASSWORD}
                    label="Confirm password"
                    placeholder="Confirm password"
                    name="repeatPassword"
                    control={control}
                    errors={errors}
                    inputClassName={styles.inputPages}
                    eyeHidden
                />
            </p>
            <Button className={styles.formButton} type={ButtonType.SUBMIT}>
                Sign Up
            </Button>
        </form>
    );
};

export { SignUpForm };
