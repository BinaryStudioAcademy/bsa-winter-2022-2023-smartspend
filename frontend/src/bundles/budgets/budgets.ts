import { config } from '~/framework/config/config';
import { http } from '~/framework/http/http';
import { storage } from '~/framework/storage/storage';

import { BudgetsApi } from './budgets-api';

const budgetsApi = new BudgetsApi({
    baseUrl: config.ENV.API.ORIGIN_URL,
    storage,
    http,
});

export { budgetsApi };
export {
    type BudgetCreateRequestDto,
    type BudgetGetAllCategoriesResponseDto,
    type BudgetGetAllResponseDto,
    type BudgetResponseDto,
} from 'shared/build/index.js';
