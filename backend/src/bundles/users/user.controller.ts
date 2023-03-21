import { type UserService } from '~/bundles/users/user.service.js';
import {
    type ApiHandlerResponse,
    Controller,
} from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { UsersApiPath } from './enums/enums.js';
import { type Gender } from './user.entity.js';

type UserUpdateRequestDto = {
    email: string;
    firstName?: string;
    lastName?: string;
    sex?: Gender;
    dateOfBirth?: string;
    language?: string;
    currency?: string;
};

type UpdateRequest = {
    params: { id: string };
    body: UserUpdateRequestDto;
};

/**
 * @swagger
 * components:
 *    schemas:
 *      User:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          email:
 *            type: string
 *            format: email
 */
class UserController extends Controller {
    private userService: UserService;

    public constructor(logger: ILogger, userService: UserService) {
        super(logger, ApiPath.USERS);

        this.userService = userService;

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'GET',
            handler: () => this.findAll(),
        });

        this.addRoute({
            path: `${UsersApiPath.ROOT}:id`,
            method: 'PUT',
            handler: (options) => this.update(options as UpdateRequest),
        });
    }

    /**
     * @swagger
     * /users:
     *    get:
     *      description: Returns an array of users
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                type: array
     *                items:
     *                  $ref: '#/components/schemas/User'
     */
    private async findAll(): Promise<ApiHandlerResponse> {
        return {
            status: HttpCode.OK,
            payload: await this.userService.findAll(),
        };
    }

    /**
     * @swagger
     * /users:
     *    put:
     *      description: Updates a user
     *      parameters:
     *        - name: payload
     *          in: body
     *          required: true
     *          schema:
     *            type: object
     *            properties:
     *              email:
     *                type: string
     *                format: email
     *              firstName:
     *                type: string
     *              lastName:
     *                type: string
     *              sex:
     *                type: string
     *                enum: [male, female]
     *              dateOfBirth:
     *                type: string
     *                format: date
     *              language:
     *                type: string
     *              currency:
     *                type: string
     *      responses:
     *        200:
     *          description: Successful operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/User'
     */
    private async update(request: UpdateRequest): Promise<ApiHandlerResponse> {
        const updatedUser = await this.userService.update(
            request.params.id,
            request.body,
        );
        return {
            status: HttpCode.OK,
            payload: updatedUser,
        };
    }
}

export { UserController };
