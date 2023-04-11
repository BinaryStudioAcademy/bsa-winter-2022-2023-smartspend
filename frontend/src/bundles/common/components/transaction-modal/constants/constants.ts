import { type Transaction } from '~/bundles/common/types/transaction.type';

const DEFAULT_TRANSACTION: Transaction = {
    categoryId: '',
    date: new Date(),
    note: '',
    labelId: undefined,
    amount: 1000,
    currencyId: '',
    walletsId: '',
};

export { DEFAULT_TRANSACTION };
