import {
    type UserSignInRequestDto,
    type UserSignUpRequestDto,
} from '~/bundles/users/users.js';
import {
    userSignInValidationSchema,
    userSignUpValidationSchema,
} from '~/bundles/users/users.js';
import {
    type ApiHandlerOptions,
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { getToken } from '../../common/helpers/helpers.js';
import { type AuthService } from './auth.service.js';
import { AuthApiPath } from './enums/enums.js';

class AuthController extends Controller {
    private authService: AuthService;

    public constructor(logger: ILogger, authService: AuthService) {
        super(logger, ApiPath.AUTH);

        this.authService = authService;

        this.addRoute({
            path: AuthApiPath.SIGN_UP,
            method: 'POST',
            validation: {
                body: userSignUpValidationSchema,
            },
            handler: (options) =>
                this.signUp(
                    options as ApiHandlerOptions<{
                        body: UserSignUpRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.SIGN_IN,
            method: 'POST',
            validation: {
                body: userSignInValidationSchema,
            },
            handler: (options) =>
                this.signIn(
                    options as ApiHandlerOptions<{
                        body: UserSignInRequestDto;
                    }>,
                ),
        });

        this.addRoute({
            path: AuthApiPath.AUTHENTICATED_USER,
            method: 'GET',
            handler: (options) =>
                this.loadUser(
                    options as ApiHandlerOptions<{
                        token: string;
                    }>,
                ),
        });
    }

    /**
     * @swagger
     * /auth/sign-up:
     *    post:
     *      tags: [Auth]
     *      description: Sign up user into the system
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *                repeatPassword:
     *                  type: string
     *      responses:
     *        201:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     */
    private async signUp(
        options: ApiHandlerOptions<{
            body: UserSignUpRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const token = await this.authService.signUp(options.body);

        return {
            status: HttpCode.CREATED,
            payload: token,
        };
    }

    /**
     * @swagger
     * /auth/sign-in:
     *    post:
     *      tags: [Auth]
     *      description: Sign in user into the system
     *      requestBody:
     *        description: User auth data
     *        required: true
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                email:
     *                  type: string
     *                  format: email
     *                password:
     *                  type: string
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     */
    private async signIn(
        options: ApiHandlerOptions<{
            body: UserSignInRequestDto;
        }>,
    ): Promise<ApiHandlerResponse> {
        const token = await this.authService.signIn(options.body);
        return {
            status: HttpCode.OK,
            payload: token,
        };
    }

    /**
     * @swagger
     * /auth/authenticated-user:
     *    get:
     *      tags: [Auth]
     *      description: Load authenticated user data
     *      parameters:
     *        - in: query
     *          name: token
     *          schema:
     *            type: integer
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: object
     *                properties:
     *                  message:
     *                    type: object
     *                    $ref: '#/components/schemas/User'
     */

    private async loadUser(
        options: ApiHandlerOptions<{
            token: string;
        }>,
    ): Promise<ApiHandlerResponse> {
        const { token: bearerToken } = options;
        const token = getToken(bearerToken);
        const user = await this.authService.getUserByToken(token);
        return {
            status: HttpCode.OK,
            payload: user,
        };
    }
}

export { AuthController };
