import { type UserSignInRequestDto } from 'shared/build';
import { userSignInValidationSchema } from 'shared/build';

import { DEFAULT_SIGN_UP_PAYLOAD } from '~/bundles/auth/components/sign-up-form/constants/constants';
import { useAppForm } from '~/bundles/common/hooks/hooks.js';

import { InputType } from '../../enums/enums.js';
import { CodeHighlight, Input } from '../components.js';

const codeExample = `
    const InputExample: React.FC = () => {
        const { control, errors } = useAppForm<UserSignInRequestDto>({
            defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
            validationSchema: userSignInValidationSchema,
            mode: 'onBlur',
        });
        return (
            <form style={{ textAlign: 'left' }}>
                <Input
                    name="email"
                    type={InputType.EMAIL}
                    label="Email"
                    placeholder="Email"
                    control={control}
                    errors={errors}
                />
                <Input
                    name="password"
                    type={InputType.PASSWORD}
                    label="Password"
                    placeholder="Password"
                    control={control}
                    errors={errors}
                />
                <Input
                    name="email"
                    type={InputType.PASSWORD}
                    label="Text"
                    placeholder="Password"
                    control={control}
                    errors={errors}
                    isDisabled={true}
                />
            </form>
    }
`;

const InputPart: React.FC = () => {
    const { control, errors } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignInValidationSchema,
        mode: 'onBlur',
    });
    return (
        <>
            <CodeHighlight code={codeExample} />
            <form>
                <Input
                    name="email"
                    type={InputType.EMAIL}
                    label="Email"
                    placeholder="Email"
                    control={control}
                    errors={errors}
                />

                <Input
                    name="password"
                    type={InputType.PASSWORD}
                    label="Password"
                    placeholder="Password"
                    control={control}
                    errors={errors}
                />

                <Input
                    name="email"
                    type={InputType.PASSWORD}
                    label="Text"
                    placeholder="Password"
                    control={control}
                    errors={errors}
                    isDisabled={true}
                />
            </form>
        </>
    );
};

export { InputPart };
