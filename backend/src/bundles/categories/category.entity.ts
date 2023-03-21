import { type IEntity } from '~/common/interfaces/interfaces.js';

class CategoryEntity implements IEntity {
    private 'id': number | null;

    private 'icon': string;

    private 'color': string;

    private 'type': string;

    private constructor({
        id,
        icon,
        color,
        type,
    }: {
        id: number | null;
        icon: string;
        color: string;
        type: string;
    }) {
        this.id = id;
        this.icon = icon;
        this.color = color;
        this.type = type;
    }

    public static initialize({
        id,
        icon,
        color,
        type,
    }: {
        id: number;
        icon: string;
        color: string;
        type: string;
    }): CategoryEntity {
        return new CategoryEntity({
            id,
            icon,
            color,
            type,
        });
    }

    public static initializeNew({
        icon,
        color,
        type,
    }: {
        icon: string;
        color: string;
        type: string;
    }): CategoryEntity {
        return new CategoryEntity({
            id: null,
            icon,
            color,
            type,
        });
    }

    public toObject(): {
        id: number;
        icon: string;
        color: string;
        type: string;
    } {
        return {
            id: this.id as number,
            icon: this.icon,
            color: this.color,
            type: this.type,
        };
    }

    public toNewObject(): {
        icon: string;
        color: string;
        type: string;
    } {
        return {
            icon: this.icon,
            color: this.color,
            type: this.type,
        };
    }
}

export { CategoryEntity };
