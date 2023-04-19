import { type TransactionUpdatePayloadDto } from 'shared/build/bundles/transactions/types/transaction-update-dto.type.js';

import { type TransactionModel } from '~/bundles/transactions/transactions.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

import { WalletsTransactionModel } from '../wallets-transactions/wallets-transactions.model.js';
import { TransactionEntity } from './transactions.js';

class TransactionRepository implements Partial<IRepository> {
    private transactionModel: typeof TransactionModel;

    public constructor(transactionModel: typeof TransactionModel) {
        this.transactionModel = transactionModel;
    }

    public async findAllTransactions(
        ownerId: string,
    ): Promise<TransactionEntity[]> {
        const transactions = await this.transactionModel
            .query()
            .select('*')
            .where({ ownerId })
            .execute();

        return transactions.map((it) => TransactionEntity.initialize(it));
    }

    public async find(data: object): Promise<TransactionEntity | undefined> {
        const transaction = await this.transactionModel
            .query()
            .select()
            .where(data)
            .first();
        if (!transaction) {
            return undefined;
        }
        return TransactionEntity.initialize(transaction);
    }

    public async createTransaction(
        entity: TransactionEntity,
    ): Promise<TransactionEntity> {
        const {
            categoryId,
            date,
            note,
            labelId,
            amount,
            currencyId,
            ownerId,
            walletsId,
        } = entity.toNewObject();
        const item = await this.transactionModel
            .query()
            .insert({
                categoryId,
                date,
                note,
                labelId,
                amount,
                currencyId,
                ownerId,
                walletsId,
            })
            .returning('*')
            .execute();

        await WalletsTransactionModel.query()
            .insert({
                walletId: walletsId,
                transactionId: item.id,
            })
            .execute();
        return TransactionEntity.initialize(item);
    }

    public async updateTransaction(
        id: string,
        payload: TransactionUpdatePayloadDto,
        ownerId: string,
    ): Promise<TransactionEntity | undefined> {
        const item = await this.transactionModel
            .query()
            .where({ id })
            .where({ ownerId })
            .update(payload)
            .returning('*')
            .execute();
        return TransactionEntity.initialize(item[0]);
    }

    public async deleteTransaction(
        id: string,
        ownerId: string,
    ): Promise<TransactionEntity | undefined> {
        const item = await this.transactionModel
            .query()
            .where({ id })
            .where({ ownerId })
            .del()
            .returning('id')
            .execute();

        return TransactionEntity.initialize(item[0]);
    }
    public async deleteTransactions(
        ownerId: string,
        transactionIds: string[],
    ): Promise<{ categoryIds: string[] } | undefined> {
        const transactions = await this.transactionModel
            .query()
            .whereIn('Id', transactionIds)
            .andWhere('ownerId', ownerId);

        if (transactions.length === 0) {
            return;
        }

        const deletedCategoryIds = transactions.map(
            (transaction) => transaction.categoryId,
        );

        await this.transactionModel
            .query()
            .whereIn('Id', transactionIds)
            .andWhere('ownerId', ownerId)
            .delete();

        return { categoryIds: deletedCategoryIds };
    }
}

export { TransactionRepository };
