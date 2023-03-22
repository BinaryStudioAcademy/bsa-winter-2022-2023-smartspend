import { storage, StorageKey } from '~/framework/storage/storage';

const useAuth = (): boolean => {
    const token = storage.getSync(StorageKey.TOKEN);
    return Boolean(token);
};

export { useAuth };
