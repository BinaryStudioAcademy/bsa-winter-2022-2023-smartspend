import { type ApiUpdateUserOptions } from 'shared/build';

import { type UserService } from '~/bundles/users/user.service.js';
import { type ApiHandlerResponse } from '~/common/controller/controller.js';
import { Controller } from '~/common/controller/controller.js';
import { ApiPath } from '~/common/enums/enums.js';
import { getUserIdFromToken } from '~/common/helpers/get-id-from-token.helper.js';
import { HttpCode } from '~/common/http/http.js';
import { type ILogger } from '~/common/logger/logger.js';

import { UsersApiPath } from './enums/enums.js';

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
            path: UsersApiPath.GET_USER,
            method: 'GET',
            handler: (options) => this.find({ token: options.token as string }),
        });

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'PUT',
            handler: (options) => {
                return this.update(options as ApiUpdateUserOptions);
            },
        });

        this.addRoute({
            path: UsersApiPath.ROOT,
            method: 'DELETE',
            handler: (options) => {
                return this.delete(options.token as string);
            },
        });
    }

    /**
     * @swagger
     * /users:
     *    get:
     *      tags: [Users]
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
     * /users/user:
     *   get:
     *     summary: Get user information
     *     description: Get information about the user associated with the specified access token.
     *     tags: [Users]
     *     security:
     *       - BearerAuth: []
     *     parameters:
     *       - in: header
     *         name: Authorization
     *         description: Access token for authorization
     *         required: true
     *         schema:
     *           type: string
     *     responses:
     *       200:
     *         description: The user information was successfully retrieved.
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/UserProfile'
     * components:
     *   schemas:
     *     UserProfile:
     *       type: object
     *       properties:
     *         email:
     *           type: string
     *           format: email
     *         id:
     *           type: string
     *           format: uuid
     *         createdAt:
     *           type: string
     *           format: date-time
     *         updatedAt:
     *           type: string
     *           format: date-time
     *         userId:
     *           type: string
     *           format: uuid
     *         firstName:
     *           type: string
     *         lastName:
     *           type: string
     *         sex:
     *           type: string
     *         dateOfBirth:
     *           type: string
     *           format: date-time
     *         language:
     *           type: string
     *         currency:
     *           type: string
     */

    private async find(options: {
        token: string;
    }): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(options.token);
        return {
            status: HttpCode.OK,
            payload: await this.userService.getCurrentUserDetails(userId),
        };
    }

    /**
     * @swagger
     * /users:
     *   put:
     *     tags:
     *       - Users
     *     description: Updates a user profile
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *                 nullable: true
     *               userProfile:
     *                 type: object
     *                 properties:
     *                   firstName:
     *                     type: string
     *                     nullable: true
     *                   lastName:
     *                     type: string
     *                     nullable: true
     *                   sex:
     *                     type: string
     *                     enum: [male, female]
     *                     nullable: true
     *                   dateOfBirth:
     *                     type: string
     *                     format: date
     *                     nullable: true
     *                   language:
     *                     type: string
     *                     nullable: true
     *                   currency:
     *                     type: string
     *                     nullable: true
     *     responses:
     *       '200':
     *         description: Successful operation
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/User'
     *   components:
     *     securitySchemes:
     *       bearerAuth:
     *         type: http
     *         scheme: bearer
     */

    private async update(
        request: ApiUpdateUserOptions,
    ): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(request.token);
        const updatedUser = await this.userService.update(userId, request.body);
        return {
            status: HttpCode.OK,
            payload: updatedUser,
        };
    }

    /**
     * @swagger
     * /users/:
     *    delete:
     *      tags:
     *       - Users
     *      description: Deletes user
     *      responses:
     *        200:
     *          description: Successful delete category operation
     *          content:
     *            application/json:
     *              schema:
     *                $ref: '#/components/schemas/Category'
     */

    private async delete(token: string): Promise<ApiHandlerResponse> {
        const userId = getUserIdFromToken(token);

        return {
            status: HttpCode.OK,
            payload: {
                success: await this.userService.deleteUser(userId),
            },
        };
    }
}

export { UserController };
