import { type UserSignUpRequestDto } from '~/bundles/users/users';

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
    email: '',
    password: '',
    confirm: '',
};

export { DEFAULT_SIGN_UP_PAYLOAD };
