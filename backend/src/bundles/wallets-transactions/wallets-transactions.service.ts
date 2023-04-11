import { type WalletsTransactionsRepository } from '~/bundles/wallets-transactions/wallets-transactions.repository.js';

type WalletsTransactionsResponseDto = {
    id: string;
    walletId: string;
    transactionId: string;
};

type WalletsTransactionsGetAllResponseDto = {
    items: WalletsTransactionsResponseDto[];
};

class WalletsTransactionsService {
    private walletsTransactionRepository: WalletsTransactionsRepository;

    public constructor(
        walletsTransactionRepository: WalletsTransactionsRepository,
    ) {
        this.walletsTransactionRepository = walletsTransactionRepository;
    }

    public async findAllTransactionsByWallet(
        walletId: string | undefined,
    ): Promise<WalletsTransactionsGetAllResponseDto> {
        const items =
            await this.walletsTransactionRepository.findAllTransactionsByWallet(
                walletId,
            );
        return {
            items: items.map((it) => it.toObject()),
        };
    }
}

export { WalletsTransactionsService };
