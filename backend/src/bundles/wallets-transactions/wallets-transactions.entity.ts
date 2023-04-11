import { type IEntity } from '~/common/interfaces/interfaces';

class WalletsTransactionsEntity implements IEntity {
    private 'id': string | null;

    private 'transactionId': string;

    private 'walletId': string;

    private constructor({
        id,
        transactionId,
        walletId,
    }: {
        id: string | null;
        transactionId: string;
        walletId: string;
    }) {
        this.id = id;
        this.transactionId = transactionId;
        this.walletId = walletId;
    }

    public static initialize({
        id,
        transactionId,
        walletId,
    }: {
        id: string;
        transactionId: string;
        walletId: string;
    }): WalletsTransactionsEntity {
        return new WalletsTransactionsEntity({
            id,
            transactionId,
            walletId,
        });
    }

    public static initializeNew({
        transactionId,
        walletId,
    }: {
        transactionId: string;
        walletId: string;
    }): WalletsTransactionsEntity {
        return new WalletsTransactionsEntity({
            id: null,
            transactionId,
            walletId,
        });
    }

    public toObject(): {
        id: string;
        transactionId: string;
        walletId: string;
    } {
        return {
            id: this.id as string,
            transactionId: this.transactionId,
            walletId: this.walletId,
        };
    }

    public toNewObject(): {
        transactionId: string;
        walletId: string;
    } {
        return {
            transactionId: this.transactionId,
            walletId: this.walletId,
        };
    }
}

export { WalletsTransactionsEntity };
