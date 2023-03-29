import { logger } from '~/common/logger/logger.js';

import { WalletController } from './wallets.controller.js';
import { WalletModel } from './wallets.model.js';
import { WalletRepository } from './wallets.repository.js';
import { WalletService } from './wallets.service.js';

const walletRepository = new WalletRepository(WalletModel);
const walletService = new WalletService(walletRepository);
const walletController = new WalletController(logger, walletService);

export { walletController, walletService };
export {
    type WalletCreateRequestDto,
    type WalletFindRequestDto,
    type WalletGetAllItemResponseDto,
    type WalletGetAllResponseDto,
} from './types/types.js';
export { WalletModel } from './wallets.model.js';
