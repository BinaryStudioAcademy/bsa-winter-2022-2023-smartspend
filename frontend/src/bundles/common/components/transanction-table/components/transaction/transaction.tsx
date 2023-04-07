import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import {
    type Control,
    type FieldErrors,
    type FieldValues,
} from 'react-hook-form';

import { Input } from '~/bundles/common/components/components';
import { getDaysLeft } from '~/bundles/common/components/transanction-table/helpers/index';
import { InputType } from '~/bundles/common/enums/enums';

import { type ITransaction } from '../../types';
import styles from '../styles.module.scss';

type Properties = {
    transaction: ITransaction;
    control: Control<FieldValues, null>;
    errors: FieldErrors;
    isFutureTransaction?: boolean;
};

const Transaction: React.FC<Properties> = ({
    transaction,
    control,
    errors,
    isFutureTransaction = false,
}) => {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = useCallback(
        (event: React.FormEvent<HTMLFormElement>): void => {
            const target = event.target as HTMLInputElement;
            if (target.checked) {
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        },
        [],
    );

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
                    <form className={styles.form} onChange={handleChange}>
                        <Input
                            type={InputType.CHECKBOX}
                            name={`checkbox-${transaction.id}`}
                            control={control}
                            errors={errors}
                            inputClassName={styles.checkbox}
                        />
                    </form>
                    <div>
                        {transaction.category.color && (
                            <span
                                style={{
                                    background: `${transaction.category.color}`,
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
                                <FontAwesomeIcon
                                    icon={transaction.category.icon as IconProp}
                                />
                            </span>
                        )}
                    </div>
                    <div>{transaction.name}</div>
                </div>
                {isFutureTransaction && (
                    <div className={styles.inDays}>
                        <span>{transaction.date}</span>
                        <span className={styles.totals}>
                            in {getDaysLeft([transaction])} days
                        </span>
                    </div>
                )}

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
        </>
    );
};

export { Transaction };
