import { WalletsTransactionsRepository } from '~/bundles/wallets-transactions/wallets-transactions.repository.js';
import { WalletsTransactionsService } from '~/bundles/wallets-transactions/wallets-transactions.service.js';

import { WalletsTransactionModel } from './wallets-transactions.model.js';

const walletsTransactionsModelRepository = new WalletsTransactionsRepository(
    WalletsTransactionModel,
);

const walletsTransactionsService = new WalletsTransactionsService(
    walletsTransactionsModelRepository,
);

export { walletsTransactionsService };
