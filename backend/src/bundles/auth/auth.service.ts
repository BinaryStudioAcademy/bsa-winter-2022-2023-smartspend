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
import { type TokenService } from '~/common/services/token/token.service.js';

type User = {
    id: number;
    email: string;
};

class AuthService {
    private userService: UserService;
    private cryptService: CryptService;
    private tokenService: TokenService;

    public constructor(
        userService: UserService,
        cryptService: CryptService,
        tokenService: TokenService,
    ) {
        this.userService = userService;
        this.cryptService = cryptService;
        this.tokenService = tokenService;
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto | undefined> {
        const isVerifyUser = await this.verifySignUpCredentials(userRequestDto);
        if (isVerifyUser) {
            const newUser = await this.userService.create(userRequestDto);
            const token = this.tokenService.createToken(newUser.toObject());
            return {
                token,
            };
        }
    }

    public async signIn(
        userRequestDto: UserSignInRequestDto,
    ): Promise<UserSignInResponseDto | undefined> {
        const user = await this.verifySignInCredentials(userRequestDto);
        const token = this.tokenService.createToken(user);
        return {
            token,
        };
    }

    /**
     * Verification of input data for creating a new user.
     * Returns true if the user can be registered
     *
     * @param requestUser UserSignUpRequestDto User model
     */
    private async verifySignUpCredentials(
        requestUser: UserSignUpRequestDto,
    ): Promise<boolean> {
        const user = await this.userService.find(requestUser);
        if (user) {
            throw new HttpError({
                message: ExceptionMessage.EMAIL_ALREADY_EXISTS,
                status: HttpCode.UNPROCESSED_ENTITY,
            });
        }
        return true;
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
