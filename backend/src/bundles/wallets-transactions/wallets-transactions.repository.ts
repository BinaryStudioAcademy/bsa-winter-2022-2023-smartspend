import { type WalletsTransactionModel } from 'backend/src/bundles/wallets-transactions/wallets-transactions.model.js';

import { WalletsTransactionsEntity } from '~/bundles/wallets-transactions/wallets-transactions.entity.js';

class WalletsTransactionsRepository {
    private walletsTransactionModel: typeof WalletsTransactionModel;

    public constructor(
        walletsTransactionModel: typeof WalletsTransactionModel,
    ) {
        this.walletsTransactionModel = walletsTransactionModel;
    }

    public async findAllTransactionsByWallet(
        walletId: string | undefined,
    ): Promise<WalletsTransactionsEntity[]> {
        const users = await this.walletsTransactionModel
            .query()
            .select('*')
            .where({ walletId })
            .execute();
        return users.map((it) => WalletsTransactionsEntity.initialize(it));
    }
}

export { WalletsTransactionsRepository };
