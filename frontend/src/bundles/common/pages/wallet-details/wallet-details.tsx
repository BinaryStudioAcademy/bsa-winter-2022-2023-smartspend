import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { type MultiValue, type SingleValue } from 'react-select';

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
    useAppForm,
    useCallback,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks.js';
import { mockSliderData } from '~/bundles/common/pages/dashboard/mocks.dashboard';
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

const categories = [
    // props to Doughnut Chart
    {
        value: 'shopping',
        name: 'Shopping',
        image: 'https://img.freepik.com/free-photo/girl-holds-fashion-shopping-bag-beauty_1150-13673.jpg',
    },
    {
        value: 'food',
        name: 'Food',
        image: 'https://media.istockphoto.com/id/153010865/uk/%D1%84%D0%BE%D1%82%D0%BE/%D1%87%D0%B5%D1%80%D0%B2%D0%BE%D0%BD%D0%B5-%D1%8F%D0%B1%D0%BB%D1%83%D0%BA%D0%BE.jpg?s=612x612&w=0&k=20&c=Hr4iJ9Taaiaz4SLEAX7BbFSvTsnSrgg-KlRV4IIHG4s=',
    },
    {
        value: 'games',
        name: 'Games',
        image: 'https://img.freepik.com/free-vector/joystick-game-sport-technology_138676-2045.jpg?w=2000',
    },
    {
        value: 'car',
        name: 'Car',
        image: 'https://store-images.microsoft.com/image/apps.27729.9007199266312409.d86b04ff-7ebb-4451-a920-9cfe5dbd05d7.ffd1ea39-da23-4062-936a-66afe45ffe14?mode=scale&q=90&h=200&w=200&background=%23000000',
    },
    {
        value: 'travel',
        name: 'Travel',
        image: 'https://thumbs.dreamstime.com/b/travel-world-landmarks-background-blue-sky-46083021.jpg',
    },
];

const WalletDetails: React.FC = () => {
    const { control, errors } = useAppForm<{ note: string }>({
        //It needs to change
        defaultValues: DEFAULT_INPUT,
    });

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
                                            data={categories}
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
