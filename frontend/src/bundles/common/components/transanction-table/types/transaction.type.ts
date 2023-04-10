import { type CategoryGetAllItemResponseDto } from 'shared/build';

type ITransaction = {
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

export { type ITransaction };
