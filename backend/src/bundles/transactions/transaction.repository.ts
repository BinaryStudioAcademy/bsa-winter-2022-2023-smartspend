import { type TransactionUpdatePayloadDto } from 'shared/build/bundles/transactions/types/transaction-update-dto.type';

import { type TransactionModel } from '~/bundles/transactions/transactions';
import { type IRepository } from '~/common/interfaces/repository.interface';

import { TransactionEntity } from './transactions';

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
        const { categoryId, date, note, label, amount, currencyId } =
            entity.toNewObject();
        const item = await this.transactionModel
            .query()
            .insert({
                categoryId,
                date,
                note,
                label,
                amount,
                currencyId,
            })
            .returning('*')
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
}

export { TransactionRepository };
