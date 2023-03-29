import { type WalletCreateRequestDto } from 'shared/build/bundles/wallets/types/create-request-dto.type';

import { WalletEntity } from '~/bundles/wallets/wallets.entity.js';
import { type WalletModel } from '~/bundles/wallets/wallets.model.js';
import { type IRepository } from '~/common/interfaces/interfaces.js';

class WalletRepository implements Partial<IRepository> {
    private walletModel: typeof WalletModel;

    public constructor(walletModel: typeof WalletModel) {
        this.walletModel = walletModel;
    }

    public async find(id: string): Promise<WalletEntity | undefined> {
        const wallet = await this.walletModel
            .query()
            .select()
            .where({ id })
            .first();
        if (!wallet) {
            return undefined;
        }
        return WalletEntity.initialize(wallet);
    }

    public async findAllWallets(ownerId: string): Promise<WalletEntity[]> {
        const users = await this.walletModel
            .query()
            .select('*')
            .where({ ownerId })
            .execute();

        return users.map((it) => WalletEntity.initialize(it));
    }

    public async createWallet(entity: WalletEntity): Promise<WalletEntity> {
        const { name, currencyId, balance, ownerId } = entity.toNewObject();

        const item = await this.walletModel
            .query()
            .insert({
                name,
                currencyId,
                balance,
                ownerId,
            })
            .returning('*')
            .execute();
        return WalletEntity.initialize(item);
    }

    public async updateWallet(
        id: string,
        entity: WalletCreateRequestDto,
        ownerId: string,
    ): Promise<WalletEntity | undefined> {
        const item = await this.walletModel
            .query()
            .where({ id })
            .where({ ownerId })
            .update(entity)
            .returning('*')
            .execute();
        return WalletEntity.initialize(item[0]);
    }

    public async deleteWallet(
        id: string,
        ownerId: string,
    ): Promise<WalletEntity | undefined> {
        const item = await this.walletModel
            .query()
            .where({ id })
            .where({ ownerId })
            .del()
            .returning('id')
            .execute();
        return WalletEntity.initialize(item[0]);
    }
}

export { WalletRepository };
