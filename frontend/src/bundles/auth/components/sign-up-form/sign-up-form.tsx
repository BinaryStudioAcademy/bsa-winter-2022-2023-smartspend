import { Button, Input } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/enums';
import {
    InputLabel,
    InputPlaceholder,
    InputSize,
    InputType,
} from '~/bundles/common/enums/enums.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import {
    type UserSignUpRequestDto,
    userSignUpValidationSchema,
} from '~/bundles/users/users';

import { DEFAULT_SIGN_UP_PAYLOAD } from './constants/constants';

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
        <>
            <h3>Sign Up</h3>
            <form onSubmit={handleFormSubmit}>
                <p>
                    <Input
                        type={InputType.EMAIL}
                        label={InputLabel.EMAIL}
                        placeholder={InputPlaceholder.EMAIL}
                        size={InputSize.MEDIUM}
                        name="email"
                        control={control}
                        errors={errors}
                    />
                </p>
                <p>
                    <Input
                        type={InputType.PASSWORD}
                        label={InputLabel.PASSWORD}
                        placeholder={InputPlaceholder.PASSWORD}
                        size={InputSize.MEDIUM}
                        name="password"
                        control={control}
                        errors={errors}
                    />
                </p>
                <Button type={ButtonType.SUBMIT}>Sign up</Button>
            </form>
        </>
    );
};

export { SignUpForm };
