import { type Transaction } from '~/bundles/common/types/transaction.type';

const DEFAULT_TRANSACTION: Transaction = {
    categoryId: '',
    date: new Date(),
    note: undefined,
    labelId: undefined,
    amount: 0,
    currencyId: '',
    walletsId: '',
};

export { DEFAULT_TRANSACTION };
