import { type CategoryGetAllItemResponseDto } from 'shared/build';

type TransactionType = {
    id: string;
    date: string;
    category: CategoryGetAllItemResponseDto;
    name?: string;
    label: string;
    amount: number;
    currency?: string;
    note?: string;
    walletsId: string;
};

export { type TransactionType };
