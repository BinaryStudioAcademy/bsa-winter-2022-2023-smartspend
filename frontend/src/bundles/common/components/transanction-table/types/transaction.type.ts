interface ITransaction {
    id: string;
    date: string;
    category: string;
    name: string;
    label: string;
    amount: number;
    currency: string;
    note?: string;
}

export { type ITransaction };
