import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import { CodeHighlight, TransactionTable } from '../components';

const codeExample = `
const TransactionTable: React.FC<TransactionTableProperties> = ({
    transactions,
}) => {
    const defaultValues = getDefaultValues(transactions);
    const { control, errors } = useAppForm({ defaultValues });
    const today = new Date();
    const pastTransactions = getPastTransactions(transactions, today);
    const futureTransactions = getFutureTransactions(transactions, today);
    const groupedPastTransactions = groupTransactionsByDate(pastTransactions);
    const dailyTotals = getDailyTotals(groupedPastTransactions);
    const futureTotals = getFutureTotals(futureTransactions);

    return (
        <div className={styles.transactionTable}>
            <FutureTransactions
                futureTotals={futureTotals}
                futureTransactions={futureTransactions}
                control={control}
                errors={errors}
            />
            <PastTransactions
                groupedPastTransactions={groupedPastTransactions}
                dailyTotals={dailyTotals}
                control={control}
                errors={errors}
            />
        </div>
    );
};
`;

const TransactionTablePart: React.FC = () => {
    const [, setIsSelectedTransactions] = useState<string[]>([]);

    const addIdCheckedTransactions = useCallback((id: string): void => {
        setIsSelectedTransactions((previousState) => {
            if (previousState.includes(id)) {
                return previousState.filter(
                    (previousState_) => previousState_ !== id,
                );
            }
            return [...previousState, id];
        });
    }, []);

    return (
        <div>
            <CodeHighlight code={codeExample} />
            <div style={{ background: '#EFF3FF', padding: '20px 0' }}>
                <TransactionTable
                    transactions={[
                        {
                            id: '1',
                            category: {
                                id: 'c7bb6975-4b6c-4699-a4a6-d1f4fdd3d9d5',
                                name: 'Food & Drink',
                                icon: 'burger',
                                color: 'red',
                                type: 'expense',
                            },
                            name: 'faBagShopping',
                            date: '2022-03-23',
                            label: 'Supermarket',
                            amount: -35,
                            currency: '$',
                            walletsId: '49cfd534-7c7f-438c-a6cd-3578b7dfd412',
                        },
                        {
                            id: '2',
                            category: {
                                id: '966ab7c8-b120-4db9-9cc3-2fff43a5143a',
                                name: 'Salary',
                                icon: 'money-bill',
                                color: 'green',
                                type: 'income',
                            },
                            name: 'faCarAlt',
                            date: '2022-03-23',
                            label: 'Gas Station',
                            amount: -50,
                            currency: '$',
                            walletsId: '49cfd534-7c7f-438c-a6cd-3578b7dfd412',
                        },
                    ]}
                    addIdCheckedTransactions={addIdCheckedTransactions}
                />
                <TransactionTable
                    transactions={[]}
                    addIdCheckedTransactions={addIdCheckedTransactions}
                />
            </div>
        </div>
    );
};

export { TransactionTablePart };
