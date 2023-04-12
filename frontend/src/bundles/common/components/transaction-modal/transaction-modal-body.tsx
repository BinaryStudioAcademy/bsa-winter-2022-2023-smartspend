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
    labels: DataType[];
    handleChangeTransaction: React.Dispatch<React.SetStateAction<Transaction>>;
};

const TransactionModalBody: React.FC<Properties> = ({
    categories,
    handleChangeTransaction,
}) => {
    const { control, errors } = useAppForm({
        defaultValues: DEFAULT_TRANSACTION,
    });
    const [selectedSingleCategory, setSelectedSingleCategory] =
        useState<DataType>(categories[0]);

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
                <Calendar
                    isRangeCalendar={false}
                    onChange={handleChangeTransaction}
                />
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
        </div>
    );
};

export { TransactionModalBody };
