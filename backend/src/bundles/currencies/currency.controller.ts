import { type ApiHandlerResponse } from '~/common/controller/controller.js';
import { Controller } from '~/common/controller/controller.package.js';
import { ApiPath, HttpCode } from '~/common/enums/enums.js';
import { type ILogger } from '~/common/logger/logger.js';

import { type CurrencyService } from './currency.service.js';
import { CurrencyApiPath, CurrencyValidationMessage } from './enums/enums.js';

class CurrencyController extends Controller {
    private currencyService: CurrencyService;

    public constructor(logger: ILogger, currencyService: CurrencyService) {
        super(logger, ApiPath.CURRENCIES);

        this.currencyService = currencyService;

        this.addRoute({
            path: CurrencyApiPath.ROOT,
            method: 'GET',
            handler: (options) => this.findAll(options.token as string),
        });
    }

    private async findAll(token: string): Promise<ApiHandlerResponse> {
        if (!token) {
            throw new Error(CurrencyValidationMessage.TOKEN_REQUIRE);
        }

        return {
            status: HttpCode.OK,
            payload: await this.currencyService.findAllCurrency(),
        };
    }
}

export { CurrencyController };
