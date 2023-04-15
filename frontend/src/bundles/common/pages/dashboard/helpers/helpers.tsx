/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { type Range } from 'react-date-range';
import {
    type CategoryGetAllItemResponseDto,
    type TransactionGetAllItemResponseDto,
    type WalletGetAllItemResponseDto,
} from 'shared/build';

import { type TransactionType } from '~/bundles/common/components/transanction-table/types';
import { type DataObject } from '~/bundles/common/types/chart-data.type';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import { gradientDoughnut } from '../../budgets/budget-details/helpers/helpers';

const DEFAULT_FILTER_CATEGORIES = [
    {
        date: '',
        total: 100,
        color: 'linear-gradient(95.5deg, #284B9F 0%, #102E68 100%)',
    },
];

type OneData = { date: string; value: number };
type DataRangeObject = { label: string; data: OneData[] };
type DataTotalObjects = { date: string; total: number; color: string }[];
type BarChartData = {
    label: string;
    data: {
        date: string;
        value: number;
    }[];
}[];
type DoughnutData = {
    date: string;
    total: number;
    color: string;
}[];

const filterLineChart = (range: Range, data: DataObject[]): DataObject[] => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    return data.filter(
        (date) =>
            startDate &&
            new Date(date.date) >= startDate &&
            endDate &&
            new Date(date.date) <= endDate,
    );
};

const filterChart = (range: Range, data: BarChartData): DataRangeObject[][] => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    return data.map(({ label, data }) => {
        const filteredData = data.filter(
            (item: { date: string | number | Date }) => {
                const itemDate = new Date(item.date);
                return (
                    (!startDate || itemDate >= startDate) &&
                    (!endDate || itemDate <= endDate)
                );
            },
        );
        return [{ label, data: filteredData }];
    });
};

const filterCategories = (
    range: Range,
    data: DoughnutData,
): DataTotalObjects => {
    const startDate: Date | undefined = range.startDate;
    const endDate: Date | undefined = range.endDate;
    const result = data.filter(
        (date) =>
            startDate &&
            new Date(date.date) >= startDate &&
            endDate &&
            new Date(date.date) <= endDate,
    );
    if (result.length === 0) {
        return DEFAULT_FILTER_CATEGORIES;
    }
    return result;
};

type WalletCategoryData = {
    value: string;
    name: string;
};

function createCategoryDataArray(
    categories: CategoryGetAllItemResponseDto[],
): DataType[] {
    return categories.map((category) => ({
        value: category.id,
        name: category.name,
        color: category.color,
        icon: category.icon,
        type: category.type,
    }));
}

const createWalletCategoryDataArray = (
    wallets: WalletGetAllItemResponseDto[],
): WalletCategoryData[] => {
    return wallets.map((wallet) => {
        return { value: wallet.name, name: wallet.name };
    });
};

interface GroupedTransaction {
    date: string;
    amount: number;
}

const calculateLineChartData = (
    transactions: TransactionGetAllItemResponseDto[],
    wallet?: WalletGetAllItemResponseDto,
): DataObject[] => {
    let minDate: Date = new Date();
    if (transactions.length > 0) {
        minDate = new Date(transactions[0].date);
        for (let index = 1; index < transactions.length; index++) {
            const transaction = transactions[index];
            const date = new Date(transaction.date);
            if (date < minDate) {
                minDate = date;
            }
        }
    }

    minDate.setDate(minDate.getDate() - 1);

    const formattedDate = minDate.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
    });

    const groupedTransactions: GroupedTransaction[] = [];
    let previousAmount = 0;
    for (const transaction of transactions) {
        const date = new Date(transaction.date).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });
        const index = groupedTransactions.findIndex((t) => t.date === date);
        if (index === -1) {
            groupedTransactions.push({
                date,
                amount: previousAmount + transaction.amount,
            });
        } else {
            groupedTransactions[index].amount += transaction.amount;
        }
        previousAmount =
            groupedTransactions.find((t) => t.date === date)?.amount ??
            previousAmount;
    }

    const calculatedData: DataObject[] = [];
    for (const transaction of groupedTransactions) {
        const initialValue = wallet ? +wallet.balance : 0;
        calculatedData.push({
            date: transaction.date,
            value: initialValue + +transaction.amount,
        });
    }

    if (wallet) {
        calculatedData.push({
            value: wallet.balance,
            date: formattedDate,
        });
    }

    return calculatedData.sort((a, b) => +new Date(a.date) - +new Date(b.date));
};

const groupTransactionsByDate = (
    transactions: TransactionGetAllItemResponseDto[],
): BarChartData => {
    const groups: Record<string, { income: number; outcome: number }> = {};

    for (const transaction of transactions) {
        const date = new Date(transaction.date).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        });

        groups[date] = { income: 0, outcome: 0 };

        if (transaction.amount > 0) {
            groups[date].income += transaction.amount;
        } else {
            groups[date].outcome += Math.abs(transaction.amount);
        }
    }

    const sortedDates = Object.keys(groups).sort((a, b) => {
        const dateA = new Date(a).getTime();
        const dateB = new Date(b).getTime();
        return dateA - dateB;
    });

    return [
        {
            label: 'income',
            data: sortedDates.map((date) => ({
                date,
                value: groups[date].income,
            })),
        },
        {
            label: 'outcome',
            data: sortedDates.map((date) => ({
                date,
                value: groups[date].outcome,
            })),
        },
    ];
};
interface ProcessedTransaction {
    date: string;
    total: number;
    color: string;
}

interface ProcessedTransactions {
    positiveResult: ProcessedTransaction[];
    negativeResult: ProcessedTransaction[];
}

type GradientMap = Record<string, string>;

const processTransactions = (
    transactions: TransactionType[],
): ProcessedTransactions => {
    const gradientMap: GradientMap = {};
    let negativeTotal = 0;
    const categoryTransactions: Record<string, TransactionType[]> = {};

    for (const current of transactions) {
        const categoryId = current.category.id;
        let transactions = categoryTransactions[categoryId];

        if (!transactions) {
            transactions = [];
            categoryTransactions[categoryId] = transactions;
        }

        transactions.push(current);
    }

    const positiveResult: ProcessedTransaction[] = [];
    const negativeResult: ProcessedTransaction[] = [];

    for (const categoryId in categoryTransactions) {
        const transactions = categoryTransactions[categoryId];
        let gradient = gradientMap[categoryId];

        if (!gradient) {
            gradient = gradientDoughnut.find(
                (color) => color.name === transactions[0].category?.color,
            )?.value as string;
            gradientMap[categoryId] = gradient;
        }

        const total = transactions.reduce(
            (accumulator, current) => +accumulator + +current.amount,
            0,
        );

        if (total >= 0) {
            positiveResult.push({
                date: transactions[0].date.toString(),
                total,
                color: gradient,
            });
        } else {
            negativeTotal += total;
            negativeResult.push({
                date: transactions[0].date.toString(),
                total,
                color: gradientDoughnut.find(
                    (color) => color.name === transactions[0].category?.color,
                )?.value as string,
            });
        }
    }

    if (negativeTotal !== 0 && negativeResult.length === 0) {
        negativeResult.push({
            date: '',
            total: negativeTotal,
            color: 'linear-gradient(95.5deg, #ff0000 0%, #ff6666 100%)',
        });
    }

    return { positiveResult, negativeResult };
};
type TransactionTypes = 'income' | 'expense';

const getTotalPeriodAmount = (
    transactions: TransactionGetAllItemResponseDto[],
    type: TransactionTypes,
    walletId?: string,
): number => {
    let filteredTransactions = [];
    if (walletId) {
        filteredTransactions = transactions
            .filter((transaction) => transaction.walletsId === walletId)
            .filter((transaction) =>
                type === 'expense'
                    ? transaction.amount < 0
                    : transaction.amount > 0,
            );
    }
    filteredTransactions = transactions.filter((transaction) =>
        type === 'expense' ? transaction.amount < 0 : transaction.amount > 0,
    );
    const total = filteredTransactions.reduce((accumulator, transaction) => {
        return accumulator + transaction.amount;
    }, 0);

    return Math.abs(total);
};

const calculateWalletBalances = (
    wallets: WalletGetAllItemResponseDto[],
    transactions: TransactionGetAllItemResponseDto[],
): WalletGetAllItemResponseDto[] => {
    const walletBalances: WalletGetAllItemResponseDto[] = [];

    for (const wallet of wallets) {
        let balance = wallet.balance;

        for (const transaction of transactions) {
            if (transaction.walletsId === wallet.id) {
                balance += transaction.amount;
            }
        }

        walletBalances.push({
            ...wallet,
            balance,
        });
    }

    return walletBalances;
};

const getTotalTransactionSum = (
    transactions: TransactionGetAllItemResponseDto[],
    walletId?: string,
): number => {
    return transactions
        .filter(
            (transaction) => !walletId || transaction.walletsId === walletId,
        )
        .reduce(
            (accumulator, transaction) => +accumulator + +transaction.amount,
            0,
        );
};

type TransactionsByCategoryType = Record<
    string,
    { total: number; transactions: TransactionType[] }
>;

const groupTransactionsByCategory = (
    transactions: TransactionType[],
): TransactionsByCategoryType => {
    const transactionsByCategory: TransactionsByCategoryType = {};
    for (const transaction of transactions) {
        const categoryName = transaction.category.name;
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!transactionsByCategory[categoryName]) {
            transactionsByCategory[categoryName] = {
                total: 0,
                transactions: [],
            };
        }
        transactionsByCategory[categoryName].total += transaction.amount;
        transactionsByCategory[categoryName].transactions.push(transaction);
    }
    return transactionsByCategory;
};

export {
    calculateLineChartData,
    calculateWalletBalances,
    createCategoryDataArray,
    createWalletCategoryDataArray,
    filterCategories,
    filterChart,
    filterLineChart,
    getTotalPeriodAmount,
    getTotalTransactionSum,
    groupTransactionsByCategory,
    groupTransactionsByDate,
    processTransactions,
};
