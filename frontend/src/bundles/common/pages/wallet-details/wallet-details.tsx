import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import {
    Button,
    CardTotal,
    Input,
} from '~/bundles/common/components/components';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { CardVariant } from '~/bundles/common/enums/card-variant.enum';

import { FaIcons } from '../../enums/enums';
import { InputType } from '../../enums/input-type.enum';
import { useAppForm } from '../../hooks/hooks';
import styles from './styles.module.scss';

const DEFAULT_INPUT: { note: string } = {
    //It needs to change
    note: '',
};

const WalletDetails: React.FC = () => {
    const { control, errors } = useAppForm<{ note: string }>({
        //It needs to change
        defaultValues: DEFAULT_INPUT,
    });

    return (
        <div className={styles.app}>
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.logo}>
                        <div className={styles.logoIcon}></div>
                        <span className={styles.logoText}>SmartSpend</span>
                    </div>
                    <div className={styles.tabs}>Add tabs here</div>
                    <div className={styles.profile}>
                        {/*There should be an img*/}
                        <span className={styles.userName}>Ann Rose</span>
                    </div>
                </div>
            </div>
            <div className={styles.body}>
                <div className={styles.bodyContainer}>
                    <div className={styles.buttonsDate}>
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MEDIUM}
                        >
                            <span>+</span>
                            <span>Add transaction</span>
                        </Button>
                        <div className={styles.buttonsContainer}>
                            <Button
                                variant={ButtonVariant.SECONDARY}
                                size={ButtonSize.MEDIUM}
                            >
                                Future
                            </Button>
                            <Button
                                variant={ButtonVariant.SECONDARY}
                                size={ButtonSize.MEDIUM}
                            >
                                Import
                            </Button>
                            <div className={styles.calendar}>
                                Add calendar here
                            </div>
                        </div>
                    </div>
                    <div className={styles.filters}>
                        <div className={styles.filtersContainer}>
                            <div className={styles.filterText}>
                                <h2>Filters</h2>
                                <button className={styles.reset}>
                                    Reset filters
                                </button>
                            </div>
                            <div className={styles.applyFilters}>
                                <div className={styles.filter}>
                                    <div className={styles.categoryText}>
                                        By category
                                    </div>
                                    <div className={styles.fakeFilter}>
                                        Dropdown
                                    </div>
                                </div>
                                <div className={styles.filter}>
                                    <div className={styles.categoryText}>
                                        By people
                                    </div>
                                    <div className={styles.fakeFilter}>
                                        Dropdown
                                    </div>
                                </div>
                                <div className={styles.filter}>
                                    {/*<div className={styles.categoryText}>By note</div>*/}
                                    <Input
                                        type={InputType.TEXT}
                                        label="E-mail"
                                        placeholder="Enter your email"
                                        name="note"
                                        control={control}
                                        errors={errors}
                                        inputClassName={styles.input}
                                    />
                                </div>
                                <div className={styles.filter}>
                                    <div className={styles.categoryText}>
                                        By amount
                                    </div>
                                    <div className={styles.fakeFilter}>
                                        Range
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.walletTransactions}>
                        <div className={styles.walletTransactionsContainer}>
                            <div className={styles.cards}>
                                <CardTotal
                                    title="Total Balance"
                                    sum={40.45}
                                    variant={CardVariant.ORANGE}
                                />
                                <CardTotal
                                    title="Total Period Change"
                                    sum={504_000_000_000.549}
                                    variant={CardVariant.BLUE}
                                />
                                <CardTotal
                                    title="Total Period Expenses"
                                    sum={-9700.34}
                                    variant={CardVariant.WHITE}
                                />
                                <CardTotal
                                    title="Total Balance"
                                    sum={7600.34}
                                    variant={CardVariant.VIOLET}
                                />
                            </div>
                            <div className={styles.futureTransactions}>
                                <h1 className={styles.futureHeader}>
                                    Till the end of period
                                </h1>
                                <div className={styles.futureBody}>
                                    {/*there should be another button or dropdown*/}
                                    <FontAwesomeIcon
                                        icon={FaIcons.CHEVRON_DOWN}
                                    />
                                    <p className={styles.futureScheduled}>
                                        Scheduled
                                    </p>
                                    <p className={styles.futureTransaction}>
                                        1 Transaction
                                    </p>
                                    <p className={styles.futureWithdraw}>
                                        -$200
                                    </p>
                                </div>
                            </div>
                            <div className={styles.expenses}>
                                <h1 className={styles.futureHeader}>
                                    Mar 02, 2023
                                </h1>
                                <div className={styles.categories}>
                                    <div className={styles.category}>
                                        <input
                                            type="checkbox"
                                            className={styles.checkbox}
                                        />
                                    </div>
                                    <div className={styles.category}>
                                        <input
                                            type="checkbox"
                                            className={styles.checkbox}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { WalletDetails };
