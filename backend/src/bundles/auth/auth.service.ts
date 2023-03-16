import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { ExceptionMessage } from '~/common/enums/enums.js';
import { HttpError } from '~/common/exceptions/exceptions.js';
import { HttpCode } from '~/common/http/enums/enums.js';
import { type CryptService } from '~/common/services/crypt/crypt.service.js';
import { tokenService } from '~/common/services/services.js';

type User = {
    id: number;
    email: string;
};

class AuthService {
    private userService: UserService;
    private cryptService: CryptService;

    public constructor(userService: UserService, cryptService: CryptService) {
        this.userService = userService;
        this.cryptService = cryptService;
    }

    public signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        return this.userService.create(userRequestDto);
    }

    public async signIn(
        userRequestDto: UserSignInRequestDto,
    ): Promise<UserSignInResponseDto | undefined> {
        const user = await this.verifySignInCredentials(userRequestDto);
        const token = tokenService.createToken(user);
        return {
            token,
        };
    }

    private async verifySignInCredentials(
        requestUser: UserSignInRequestDto,
    ): Promise<User> {
        const user = await this.userService.find(requestUser);
        if (!user) {
            throw new HttpError({
                message: ExceptionMessage.INVALID_CREDENTIALS,
                status: HttpCode.UNAUTHORIZED,
            });
        }
        const userNewObject = user.toNewObject();
        const userObject = user.toObject();
        const isEqualPassword = this.cryptService.compareSyncPassword(
            requestUser.password,
            userNewObject.passwordHash,
        );
        if (!isEqualPassword) {
            throw new HttpError({
                message: ExceptionMessage.INVALID_CREDENTIALS,
                status: HttpCode.UNAUTHORIZED,
            });
        }
        return userObject;
    }
}

export { AuthService };
