import {
    type BudgetCreateRequestDto,
    type BudgetFindRequestDto,
} from './types.js';

type TokenRequestDto = {
    body: BudgetCreateRequestDto;
    params: BudgetFindRequestDto;
    token: string;
};

export { type TokenRequestDto };
