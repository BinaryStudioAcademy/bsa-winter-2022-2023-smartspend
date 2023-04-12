import { type IEntity } from '~/common/interfaces/interfaces.js';

import { type CategoryType } from './categories.js';

class CategoryEntity implements IEntity {
    public 'id': string | null;

    private 'name': string;

    private 'icon': string;

    private 'color': string;

    private 'type': CategoryType;

    private constructor({
        id,
        name,
        icon,
        color,
        type,
    }: {
        id: string | null;
        name: string;
        icon: string;
        color: string;
        type: CategoryType;
    }) {
        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.type = type;
    }

    public static initialize({
        id,
        name,
        icon,
        color,
        type,
    }: {
        id: string;
        name: string;
        icon: string;
        color: string;
        type: CategoryType;
    }): CategoryEntity {
        return new CategoryEntity({
            id,
            name,
            icon,
            color,
            type,
        });
    }

    public static initializeNew({
        name,
        icon,
        color,
        type,
    }: {
        name: string;
        icon: string;
        color: string;
        type: CategoryType;
    }): CategoryEntity {
        return new CategoryEntity({
            id: null,
            name,
            icon,
            color,
            type,
        });
    }

    public toObject(): {
        id: string;
        name: string;
        icon: string;
        color: string;
        type: CategoryType;
    } {
        return {
            id: this.id as string,
            name: this.name,
            icon: this.icon,
            color: this.color,
            type: this.type,
        };
    }

    public toNewObject(): {
        name: string;
        icon: string;
        color: string;
        type: CategoryType;
    } {
        return {
            name: this.name,
            icon: this.icon,
            color: this.color,
            type: this.type,
        };
    }
}

export { CategoryEntity };
