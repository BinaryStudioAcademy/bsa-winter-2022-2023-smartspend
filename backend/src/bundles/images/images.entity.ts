import { type IEntity } from '~/common/interfaces/interfaces.js';

class ImageEntity implements IEntity {
    private 'id'?: string | null;

    public 'path': string;

    private constructor({ id, path }: { id: string | null; path: string }) {
        this.id = id;
        this.path = path;
    }

    public static initialize({
        id,
        path,
    }: {
        id: string;
        path: string;
    }): ImageEntity {
        return new ImageEntity({
            id,
            path,
        });
    }

    public static initializeNew({ path }: { path: string }): ImageEntity {
        return new ImageEntity({
            id: null,
            path,
        });
    }

    public toObject(): {
        id: string;
        path: string;
    } {
        return {
            id: this.id as string,
            path: this.path,
        };
    }

    public toNewObject(): {
        path: string;
    } {
        return {
            path: this.path,
        };
    }
}

export { ImageEntity };
