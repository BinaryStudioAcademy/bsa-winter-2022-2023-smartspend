import { TransactionValidationMessage } from './enums/enums';
import { type TransactionRepository, TransactionEntity } from './transactions';
import {
    type TransactionCreateRequestDto,
    type TransactionFindRequestDto,
    type TransactionGetAllItemResponseDto,
    type TransactionGetAllResponseDto,
    type TransactionUpdatePayloadDto,
} from './types/types';

class TransactionService {
    private transactionRepository: TransactionRepository;

    public constructor(transactionRepository: TransactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public async find(
        payload: TransactionFindRequestDto,
    ): Promise<TransactionEntity | undefined> {
        return await this.transactionRepository.find(payload);
    }

    public async findAll(
        ownerId: string,
    ): Promise<TransactionGetAllResponseDto> {
        const items = await this.transactionRepository.findAllTransactions(
            ownerId,
        );

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async create(
        payload: TransactionCreateRequestDto,
        userId: string,
    ): Promise<TransactionGetAllItemResponseDto> {
        const transaction = await this.transactionRepository.createTransaction(
            TransactionEntity.initializeNew({
                categoryId: payload.categoryId,
                date: payload.date,
                note: payload.note,
                label: payload.label,
                amount: payload.amount,
                currencyId: payload.currencyId,
                ownerId: userId,
            }),
        );

        return transaction.toObject();
    }

    public async update(
        id: string,
        payload: TransactionUpdatePayloadDto,
        ownerId: string,
    ): Promise<TransactionGetAllItemResponseDto | undefined> {
        const updatedTransaction =
            await this.transactionRepository.updateTransaction(
                id,
                payload,
                ownerId,
            );

        if (!updatedTransaction) {
            throw new Error(TransactionValidationMessage.TRANSACTION_NOT_FOUND);
        }

        return updatedTransaction.toObject();
    }

    public async delete(
        id: string,
        ownerId: string,
    ): Promise<TransactionEntity | undefined> {
        const deletedTransaction =
            await this.transactionRepository.deleteTransaction(id, ownerId);

        if (!deletedTransaction) {
            throw new Error(TransactionValidationMessage.TRANSACTION_NOT_FOUND);
        }
        return deletedTransaction;
    }
}

export { TransactionService };
