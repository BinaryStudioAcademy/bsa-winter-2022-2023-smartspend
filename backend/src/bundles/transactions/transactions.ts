import { logger } from '~/common/logger/logger.js';

import { TransactionController } from './transaction.controller.js';
import { TransactionModel } from './transaction.model.js';
import { TransactionRepository } from './transaction.repository.js';
import { TransactionService } from './transaction.service.js';

const transactionRepository = new TransactionRepository(TransactionModel);
const transactionService = new TransactionService(transactionRepository);
const transactionController = new TransactionController(
    logger,
    transactionService,
);

export { transactionController, transactionService };
export { TransactionController } from './transaction.controller';
export { TransactionEntity } from './transaction.entity';
export { TransactionModel } from './transaction.model';
export { TransactionRepository } from './transaction.repository';
export { TransactionService } from './transaction.service';
