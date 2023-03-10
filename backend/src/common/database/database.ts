import { config } from '~/common/config/config.js';
import { logger } from '~/common/logger/logger.js';

import { Database } from './database.package.js';

const database = new Database(config, logger);

export { database };
export { Abstract as AbstractModel } from './abstract.model.js';
export { DatabaseTableName } from './enums/enums.js';
export { type IDatabase } from './interfaces/interfaces.js';
