
import React from 'react';

import { Calendar } from '~/bundles/common/components/calendar/calendar';
import { Input } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/components';
import { DEFAULT_TRANSACTION } from '~/bundles/common/components/transaction-modal/constants/constants';
import { TransactionModalElement } from '~/bundles/common/components/transaction-modal/transaction-modal-element';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import { type Transaction } from '~/bundles/common/types/transaction.type';

import styles from './styles.module.scss';

type Properties = {
    categories: DataType[];
    currency: DataType[];
    labels: DataType[];
    handleChangeTransaction: React.Dispatch<React.SetStateAction<Transaction>>;
};

const TransactionModalBody: React.FC<Properties> = ({
    categories,
    currency,
    labels,
    handleChangeTransaction,
}) => {
    const { control, errors } = useAppForm({
        defaultValues: DEFAULT_TRANSACTION,
    });

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
        (event: React.ChangeEvent<HTMLInputElement>) =>
            handleChangeTransaction((previousState) => {
                return {
                    ...previousState,
                    amount: +event.target.value,
                };
            }),
        [handleChangeTransaction],
    );

    const [selectedSingleCategory, setSelectedSingleCategory] =
        useState<DataType>(categories[0]);

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

    const [selectedSingleCurrency, setSelectedSingleCurrency] =
        useState<DataType>(currency[0]);

    const handleDropdownChangeCurrency = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingleCurrency(selectedOption);
                handleChangeTransaction((previousState) => {
                    return {
                        ...previousState,
                        currencyId: selectedOption.value,
                    };
                });
            }
        },
        [handleChangeTransaction],
    );

    const [selectedSingleLabel, setSelectedSingleLabel] = useState<DataType>(
        labels[0],
    );

    const handleDropdownChangeLabel = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingleLabel(selectedOption);
            }
        },
        [],
    );

    return (
        <div className={styles.body}>
            <TransactionModalElement label="Category">
                <Dropdown
                    data={categories}
                    selectedOption={selectedSingleCategory}
                    handleChange={handleDropdownChangeCategory}
                />
            </TransactionModalElement>
            <TransactionModalElement label="Date">
                <Calendar isRangeCalendar={false} />
            </TransactionModalElement>
            <TransactionModalElement label="Note">
                <Input
                    inputClassName={styles.note}
                    type={InputType.TEXT}
                    placeholder="Write note"
                    name="note"
                    control={control}
                    errors={errors}
                    onChange={handleNoteChange}
                />
            </TransactionModalElement>
            <TransactionModalElement label="Amount">
                <Input
                    inputClassName={styles.amount}
                    type={InputType.NUMBER}
                    placeholder="1000"
                    name="amount"
                    control={control}
                    errors={errors}
                    onChange={handleAmountChange}
                />
            </TransactionModalElement>
            <TransactionModalElement label="Currency">
                <Dropdown
                    data={currency}
                    selectedOption={selectedSingleCurrency}
                    handleChange={handleDropdownChangeCurrency}
                />
            </TransactionModalElement>
        </div>
    );
};

export { TransactionModalBody };
