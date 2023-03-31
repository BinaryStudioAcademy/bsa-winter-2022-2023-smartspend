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
    return (
        <div>
            <CodeHighlight code={codeExample} />
            <div style={{ background: '#EFF3FF', padding: '20px 0' }}>
                <TransactionTable
                    transactions={[
                        {
                            id: '1',
                            category: 'Food',
                            name: 'faBagShopping',
                            date: '2022-03-23',
                            label: 'Supermarket',
                            amount: -35,
                            currency: '$',
                        },
                        {
                            id: '2',
                            category: 'Transport',
                            name: 'faCarAlt',
                            date: '2022-03-23',
                            label: 'Gas Station',
                            amount: -50,
                            currency: '$',
                        },
                        {
                            id: '3',
                            category: 'Shopping',
                            name: 'faStoreAltSlash',
                            date: '2022-04-22',
                            label: 'Clothing Store',
                            amount: 120,
                            currency: '$',
                        },
                        {
                            id: '4',
                            category: 'Food',
                            name: 'faBowlFood',
                            date: '2022-03-22',
                            label: 'Cafeteria',
                            amount: -10,
                            currency: '$',
                        },
                        {
                            id: '5',
                            category: 'Transport',
                            name: 'faCarAlt',
                            date: '2022-03-22',
                            label: 'Taxi Company',
                            amount: -25,
                            currency: '$',
                        },
                        {
                            id: '6',
                            category: 'Salary',
                            name: 'faMoneyBill',
                            date: '2023-03-30',
                            label: 'Electronics Store',
                            amount: 3500,
                            currency: '$',
                        },
                        {
                            id: '7',
                            category: 'Food',
                            name: 'faBowlFood',
                            date: '2024-03-21',
                            label: 'Restaurant',
                            amount: -60,
                            currency: '$',
                        },
                        {
                            id: '8',
                            category: 'Transport',
                            name: 'faCarAlt',
                            date: '2022-03-21',
                            label: 'Public Transport',
                            amount: -5,
                            currency: '$',
                        },
                    ]}
                />
            </div>
        </div>
    );
};

export { TransactionTablePart };
