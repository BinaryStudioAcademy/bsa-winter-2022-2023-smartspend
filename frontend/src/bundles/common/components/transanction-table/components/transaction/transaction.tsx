import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldValues,
} from 'react-hook-form';

import { Icon, TransactionModal } from '~/bundles/common/components/components';
import { getDaysLeft } from '~/bundles/common/components/transanction-table/helpers/index';
import { TransactionModalType } from '~/bundles/common/enums/enums';
import { Checkbox } from '~/bundles/common/pages/categories-settings/components/checkbox/checkbox';

import { type TransactionType } from '../../types';
import styles from '../styles.module.scss';

type Properties = {
    transaction: TransactionType;
    control?: Control<FieldValues, null>;
    errors?: FieldErrors;
    isFutureTransaction?: boolean;
    addIdCheckedTransactions: (id: string) => void;
};

const Transaction: React.FC<Properties> = ({
    transaction,
    isFutureTransaction = false,
    addIdCheckedTransactions,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = useCallback(
        (isChecked: boolean): void => {
            setIsChecked(isChecked);
            addIdCheckedTransactions(transaction.id);
        },
        [addIdCheckedTransactions, transaction.id],
    );

    const [activeModal, setActiveModal] = useState(false);
    const openTransactionModal = useCallback((): void => {
        setActiveModal(true);
    }, []);

    const closeTransactionModal = useCallback(() => {
        setActiveModal(false);
    }, []);

    return (
        <>
            <div
                key={transaction.id}
                className={classNames(
                    styles.transaction,
                    isChecked ? styles.checked : styles.unchecked,
                )}
            >
                <div className={classNames(styles.columns, styles.leftColumn)}>
                    <div className={styles.form}>
                        <Checkbox
                            id={transaction.id}
                            isChecked={isChecked}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    {transaction.category.color && (
                        <span
                            style={{
                                background: `var(${transaction.category.color})`,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                height: '25px',
                                width: '25px',
                                borderRadius: '6px',
                                color: '#fff',
                            }}
                        >
                            <Icon
                                name={transaction.category.icon as IconProp}
                            />
                        </span>
                    )}
                </div>
                <div
                    className={styles.transactionBody}
                    onClick={openTransactionModal}
                    role="presentation"
                >
                    <div className={styles.transactionInfo}>
                        <div className={styles.transactionName}>
                            {transaction.name}
                        </div>
                    </div>
                    {isFutureTransaction ? (
                        <div className={styles.inDays}>
                            <span>{transaction.date}</span>
                            <span className={styles.totals}>
                                in {getDaysLeft([transaction])} days
                            </span>
                        </div>
                    ) : (
                        <div></div>
                    )}
                    <div className={styles.transactionNote}>
                        {transaction.note}
                    </div>

                    <div
                        className={classNames(
                            styles.columns,
                            styles.rightColumn,
                            transaction.amount < 0 ? styles.minus : styles.plus,
                        )}
                    >
                        {transaction.amount.toFixed(2)}
                        {transaction.currency}
                    </div>
                </div>
            </div>
            <TransactionModal
                type={TransactionModalType.CHANGE}
                handleCancel={closeTransactionModal}
                active={activeModal}
                transactionId={transaction.id}
            />
        </>
    );
};

export { Transaction };
