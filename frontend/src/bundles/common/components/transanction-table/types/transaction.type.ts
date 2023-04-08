import { type CategoryGetAllItemResponseDto } from 'shared/build';

interface ITransaction {
    id: string;
    date: string;
    category: CategoryGetAllItemResponseDto;
    name?: string;
    label: string;
    amount: number;
    currency?: string;
    note?: string;
}

export { type ITransaction };
