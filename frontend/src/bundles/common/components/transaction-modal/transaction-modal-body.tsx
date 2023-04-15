/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { type TransactionGetAllItemResponseDto } from 'shared/build';

import { Icon, Input } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/components';
import { DEFAULT_TRANSACTION } from '~/bundles/common/components/transaction-modal/constants/constants';
import { TransactionModalElement } from '~/bundles/common/components/transaction-modal/transaction-modal-element';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';
import { type DataType } from '~/bundles/common/types/dropdown.type';
import { type Transaction } from '~/bundles/common/types/transaction.type';

import { OneDayCalendar } from '../calendar/components/components';
import styles from './styles.module.scss';

interface Category {
    id: string;
    type: string;
    value: string;
    text?: string;
    label?: string;
}

type Properties = {
    categories: Category[];
    labels: DataType[];
    handleChangeTransaction: React.Dispatch<React.SetStateAction<Transaction>>;
    transactions?: TransactionGetAllItemResponseDto[];
    transactionId?: string;
};

const TransactionModalBody: React.FC<Properties> = ({
    categories,
    handleChangeTransaction,
    transactions,
    transactionId,
}) => {
    const findTransaction = useMemo(
        () =>
            transactions?.find(
                (transaction) => transaction.id === transactionId,
            ),
        [transactionId, transactions],
    );
    const findCategory = categories.find(
        (category) => category.id === findTransaction?.categoryId,
    );
    const initialAmount = findTransaction
        ? Math.abs(findTransaction.amount)
        : 0;
    const existingData = findTransaction && {
        categoryId: findCategory?.id as string,
        date: new Date(findTransaction.date),
        note: findTransaction.note,
        labelId: findTransaction.labelId,
        amount: initialAmount,
        currencyId: findTransaction.currencyId as string,
        walletsId: findTransaction.walletsId,
    };

    const { control, errors } = useAppForm({
        defaultValues: existingData ?? DEFAULT_TRANSACTION,
    });

    const [amountValue, setAmountValue] = useState<number | undefined>(
        initialAmount,
    );
    const [selectedSingleCategory, setSelectedSingleCategory] = useState<
        DataType | undefined
    >(findCategory);

    const handleNoteChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeTransaction((previousState) => {
                return {
                    ...previousState,
                    note: event.target.value,
                };
            }),
        [handleChangeTransaction],
    );

    const handleAmountChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const inputString = event.target.value;
            const formattedValue = inputString;
            const newAmount = Number.parseFloat(formattedValue);
            if (!Number.isNaN(newAmount) && newAmount >= 0) {
                setAmountValue(newAmount);
                handleChangeTransaction((previousState) => {
                    return {
                        ...previousState,
                        amount: newAmount,
                    };
                });
            } else {
                setAmountValue('' as unknown as number);
            }
        },
        [handleChangeTransaction],
    );

    const handleDropdownChangeCategory = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingleCategory(selectedOption);
                handleChangeTransaction((previousState) => {
                    return {
                        ...previousState,
                        categoryId: selectedOption.value,
                    };
                });
            }
        },
        [handleChangeTransaction],
    );
    const categoryGroups: Record<string, Category[]> = {};

    for (const category of categories) {
        if (!categoryGroups[category.type]) {
            categoryGroups[category.type] = [];
        }
        categoryGroups[category.type].push(category);
    }

    // eslint-disable-next-line sonarjs/no-unused-collection
    const data = [];

    if (categoryGroups.income) {
        data.push({ label: 'Income', options: categoryGroups.income });
    }

    if (categoryGroups.expense) {
        data.push({ label: 'Expense', options: categoryGroups.expense });
    }

    const FormatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.dropdownCategoryItem}>
                {data.icon && (
                    <span
                        className={styles.dropdownCategoryIcon}
                        style={{
                            background: `var(${data.color})`,
                        }}
                    >
                        <Icon name={data.icon as IconProp} />
                    </span>
                )}
                {data.name && (
                    <span className={styles.dropdownCategoryName}>
                        {data.name}
                    </span>
                )}
            </div>
        ),
        [],
    );

    useEffect(() => {
        if (findTransaction) {
            const mutableTransaction: Transaction = {
                categoryId: findCategory?.id as string,
                date: new Date(findTransaction.date),
                note: findTransaction.note,
                labelId: findTransaction.labelId,
                amount: initialAmount,
                currencyId: findTransaction.currencyId as string,
                walletsId: findTransaction.walletsId,
            };
            handleChangeTransaction(mutableTransaction);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [findTransaction]);

    return (
        <div className={styles.body}>
            <TransactionModalElement label="Category">
                <Dropdown
                    data={data as unknown as DataType[]}
                    formatOptionLabel={FormatOptionLabel}
                    selectedOption={selectedSingleCategory}
                    handleChange={handleDropdownChangeCategory}
                />
            </TransactionModalElement>
            <TransactionModalElement label="Date">
                <OneDayCalendar
                    initialDate={
                        findTransaction && new Date(findTransaction.date)
                    }
                    onChange={handleChangeTransaction}
                />
            </TransactionModalElement>
            <TransactionModalElement label="Note (optional)">
                <Input
                    inputClassName={styles.note}
                    type={InputType.TEXT}
                    placeholder="Write note"
                    name="note"
                    control={control}
                    errors={errors}
                    onChange={handleNoteChange}
                    value={findTransaction?.note}
                />
            </TransactionModalElement>
            <TransactionModalElement label="Amount">
                <Input
                    inputClassName={styles.amount}
                    type={InputType.TEXT}
                    placeholder="0.00"
                    name="amount"
                    control={control}
                    errors={errors}
                    value={amountValue === 0 ? '' : amountValue}
                    onChange={handleAmountChange}
                />
            </TransactionModalElement>
        </div>
    );
};

export { TransactionModalBody };
