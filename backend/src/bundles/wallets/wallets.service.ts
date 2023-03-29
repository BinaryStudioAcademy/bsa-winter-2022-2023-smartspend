import { WalletEntity } from '~/bundles/wallets/wallets.entity.js';
import { type WalletRepository } from '~/bundles/wallets/wallets.repository.js';

import { WalletValidationMessage } from './enums/enums.js';
import {
    type WalletCreateRequestDto,
    type WalletFindRequestDto,
    type WalletGetAllItemResponseDto,
    type WalletGetAllResponseDto,
} from './types/types.js';

class WalletService {
    private walletRepository: WalletRepository;

    public constructor(walletRepository: WalletRepository) {
        this.walletRepository = walletRepository;
    }

    public async find(
        payload: WalletFindRequestDto,
    ): Promise<WalletEntity | undefined> {
        return await this.walletRepository.find(payload.id);
    }

    public async findAllWallets(
        ownerId: string,
    ): Promise<WalletGetAllResponseDto> {
        const items = await this.walletRepository.findAllWallets(ownerId);

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async createWallet(
        payload: WalletCreateRequestDto,
        userId: string,
    ): Promise<WalletGetAllItemResponseDto> {
        const wallet = await this.walletRepository.createWallet(
            WalletEntity.initializeNew({
                name: payload.name,
                currencyId: payload.currencyId,
                balance: payload.balance,
                ownerId: userId,
            }),
        );

        return wallet.toObject();
    }

    public async updateWallet(
        id: string,
        payload: WalletCreateRequestDto,
        userId: string,
    ): Promise<WalletGetAllItemResponseDto | undefined> {
        const updatedWallet = await this.walletRepository.updateWallet(
            id,
            payload,
            userId,
        );

        if (!updatedWallet) {
            throw new Error(WalletValidationMessage.WALLET_NOT_FOUND);
        }

        return updatedWallet.toObject();
    }

    public async deleteWallet(
        id: string,
        ownerId: string,
    ): Promise<WalletGetAllResponseDto | undefined> {
        const deletedWallet = await this.walletRepository.deleteWallet(
            id,
            ownerId,
        );

        if (!deletedWallet) {
            throw new Error(WalletValidationMessage.WALLET_NOT_FOUND);
        }
        return await this.findAllWallets(ownerId);
    }
}

export { WalletService };
