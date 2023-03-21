import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from 'shared/build';

import { Button, Input } from '~/bundles/common/components/components.js';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';

import { DEFAULT_SIGN_IN_PAYLOAD } from './constants/constants';

type Properties = {
    onSubmit: (event: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
        validationSchema: userSignInValidationSchema,
    });
    const submit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );
    return (
        <>
            <h1>Sign In</h1>
            <form onSubmit={submit}>
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
                <Button>Sign in</Button>
            </form>
        </>
    );
};

export { SignInForm };
