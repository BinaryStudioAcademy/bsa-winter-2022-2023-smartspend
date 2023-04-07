import { type CurrencyGetAllItemResponseDto } from '~/bundles/currencies/types/types.js';

const findCurrencyById = (
    currencies: CurrencyGetAllItemResponseDto[],
    id: string | undefined,
): CurrencyGetAllItemResponseDto | undefined => {
    return currencies.find((currency) => currency.id === id);
};

export { findCurrencyById };
