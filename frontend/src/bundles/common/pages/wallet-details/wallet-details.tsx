import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { type MultiValue, type SingleValue } from 'react-select';
import {
    type CategoryGetAllItemResponseDto,
    type CategoryGetAllResponseDto,
} from 'shared/build/index.js';

import { RangeCalendar } from '~/bundles/common/components/calendar/components/components.js';
import {
    Button,
    CardTotal,
    Input,
    MultiDropdown,
    RangeSlider,
    TransactionTable,
} from '~/bundles/common/components/components.js';
import {
    ButtonSize,
    ButtonVariant,
    CardVariant,
    FaIcons,
    InputType,
} from '~/bundles/common/enums/enums.js';
import {
    useAppDispatch,
    useAppForm,
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { mockSliderData } from '~/bundles/common/pages/dashboard/mocks.dashboard';
import { loadCategories } from '~/bundles/common/stores/categories/actions.js';
import { type DataType } from '~/bundles/common/types/dropdown.type.js';
import { type RangeLimits } from '~/bundles/common/types/range-slider.type.js';

import styles from './styles.module.scss';

const DEFAULT_INPUT: { note: string } = {
    //It needs to change
    note: '',
};

const people = [
    {
        value: 'John Doe',
        name: 'John Doe',
        image: 'https://placekitten.com/50/50',
    },
    {
        value: 'Jane Smith',
        name: 'Jane Smith',
        image: 'https://placekitten.com/51/51',
    },
    {
        value: 'Alice Johnson',
        name: 'Alice Johnson',
        image: 'https://placekitten.com/52/52',
    },
    {
        value: 'Bob Brown',
        name: 'Bob Brown',
        image: 'https://placekitten.com/53/53',
    },
    {
        value: 'Charlie Green',
        name: 'Charlie Green',
        image: 'https://placekitten.com/54/54',
    },
];

const WalletDetails: React.FC = () => {
    const { control, errors } = useAppForm<{ note: string }>({
        //It needs to change
        defaultValues: DEFAULT_INPUT,
    });

    const dispatch = useAppDispatch();

    useEffect(() => {
        void dispatch(loadCategories());
    }, [dispatch]);

    const category = useAppSelector(
        (state) => state.categories.categories?.items ?? [],
    );

    const newDataMenu = category.map((item) => ({
        ...item,
        value: item.id,
    }));

    const [peopleDropdown, setPeopleDropdown] = useState<
        MultiValue<DataType> | SingleValue<DataType>
    >([]);

    const [categoriesDropdown, setCategoriesDropdown] = useState<
        MultiValue<DataType> | SingleValue<DataType>
    >([]);

    const rangeLimits = useMemo(() => {
        return { min: -100, max: 1000 };
    }, []);

    const [currentRange, setCurrentRange] = useState(rangeLimits);
    const [, setFilteredData] = useState(mockSliderData);

    const handlePeopleMultiDropdownChange = useCallback(
        (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
            if (selectedOption === null) {
                setPeopleDropdown([]);
            } else {
                setPeopleDropdown(selectedOption);
            }
        },
        [],
    );

    const handleCategoriesMultiDropdownChange = useCallback(
        (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
            if (selectedOption === null) {
                setCategoriesDropdown([]);
            } else {
                setCategoriesDropdown(selectedOption);
            }
        },
        [],
    );

    const handleSliderChange = useCallback((range: RangeLimits): void => {
        setCurrentRange(range);

        const newFilteredData = mockSliderData.filter(
            (item) => item.amount >= range.min && item.amount <= range.max,
        );
        setFilteredData(newFilteredData);
    }, []);

    const hangleReset = useCallback((): void => {
        setPeopleDropdown([]);
        setCategoriesDropdown([]);
        setFilteredData(mockSliderData);
        setCurrentRange(rangeLimits);
    }, [rangeLimits]);

    const formatOptionLabel = useCallback(
        (data: DataType): JSX.Element => (
            <div className={styles.item}>
                <input
                    type="checkbox"
                    checked={(categoriesDropdown as MultiValue<DataType>).some(
                        (option) => option.value === data.value,
                    )}
                    readOnly
                    className={styles.checkbox}
                />

                {data.icon && (
                    <span
                        style={{
                            background: `${data.color}`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '25px',
                            width: '25px',
                            borderRadius: '6px',
                        }}
                    >
                        <FontAwesomeIcon
                            icon={data.icon as IconProp}
                            color="#fff"
                        />
                    </span>
                )}
                {data.icon && <span className={styles.name}>{data.name}</span>}
            </div>
        ),
        [categoriesDropdown],
    );

    return (
        <div className={styles.app}>
            <div className={styles.body}>
                <div className={classNames(styles.bodyContainer, 'container')}>
                    <div className={styles.buttonsDate}>
                        <div className={styles.buttonsContainer}>
                            <Button
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                            >
                                <FontAwesomeIcon icon={FaIcons.PLUS} />
                                <span>Add transaction</span>
                            </Button>
                            <div className={styles.buttons}>
                                <Button
                                    className={styles.button}
                                    variant={ButtonVariant.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                >
                                    Future
                                </Button>
                                <Button
                                    className={styles.button}
                                    variant={ButtonVariant.SECONDARY}
                                    size={ButtonSize.MEDIUM}
                                >
                                    Import
                                </Button>
                            </div>
                        </div>
                        <RangeCalendar />
                    </div>
                    <div className={styles.filters}>
                        <div
                            className={classNames(
                                styles.filtersContainer,
                                'container',
                            )}
                        >
                            <div className={styles.filterText}>
                                <h2>Filters</h2>
                                <button
                                    className={styles.reset}
                                    onClick={hangleReset}
                                >
                                    Reset filters
                                </button>
                            </div>
                            <div className={styles.applyFilters}>
                                <div className={styles.filter}>
                                    <div className={styles.dropdown}>
                                        <MultiDropdown
                                            formatOptionLabel={
                                                formatOptionLabel
                                            }
                                            data={newDataMenu}
                                            selectedOption={categoriesDropdown}
                                            handleChange={
                                                handleCategoriesMultiDropdownChange
                                            }
                                            label="By category"
                                        />
                                    </div>
                                </div>
                                <div className={styles.filter}>
                                    <div className={styles.dropdown}>
                                        <MultiDropdown
                                            data={people}
                                            selectedOption={peopleDropdown}
                                            handleChange={
                                                handlePeopleMultiDropdownChange
                                            }
                                            label="By people"
                                        />
                                    </div>
                                </div>
                                <div className={styles.filter}>
                                    <div className={styles.dropdown}>
                                        <Input
                                            type={InputType.TEXT}
                                            label="By note"
                                            placeholder="filter by specific keyword"
                                            name="note"
                                            control={control}
                                            errors={errors}
                                            inputClassName={styles.input}
                                        />
                                    </div>
                                </div>
                                <div
                                    className={classNames(
                                        styles.filter,
                                        styles.rangeFilter,
                                    )}
                                >
                                    <span className={styles.categoryText}>
                                        By amount
                                    </span>
                                    <div className={styles.slider}>
                                        <RangeSlider
                                            rangeLimits={rangeLimits}
                                            currentRange={currentRange}
                                            onChange={handleSliderChange}
                                        />
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
                                    sum={504}
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
                            <div className={styles.transactionsContainer}>
                                <TransactionTable
                                    transactions={[
                                        {
                                            id: '1',
                                            category: 'Food and drink',
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
                                        {
                                            id: '9',
                                            category: 'Salary',
                                            name: 'faMoneyBill',
                                            date: '2023-04-30',
                                            label: 'Electronics Store',
                                            amount: 3500,
                                            currency: '$',
                                        },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { WalletDetails };
