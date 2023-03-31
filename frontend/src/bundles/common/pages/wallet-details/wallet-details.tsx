import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React from 'react';
import { type MultiValue, type SingleValue } from 'react-select';

import { RangeCalendar } from '~/bundles/common/components/calendar/range-calendar.js';
import {
    Button,
    CardTotal,
    Input,
    RangeSlider,
} from '~/bundles/common/components/components.js';
import { MultiDropdown } from '~/bundles/common/components/dropdown/multi-dropdown.js';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum.js';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum.js';
import { CardVariant } from '~/bundles/common/enums/card-variant.enum.js';
import { useCallback, useMemo, useState } from '~/bundles/common/hooks/hooks';
import { mockSliderData } from '~/bundles/common/pages/dashboard/mocks.dashboard';
import { type DataType } from '~/bundles/common/types/dropdown.type';
import { type RangeLimits } from '~/bundles/common/types/range-slider.type.js';

import { FaIcons } from '../../enums/enums.js';
import { InputType } from '../../enums/input-type.enum.js';
import { useAppForm } from '../../hooks/hooks.js';
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
                <div className={styles.bodyContainer}>
                    <div className={styles.buttonsDate}>
                        <div className={styles.buttonsContainer}>
                            <Button
                                variant={ButtonVariant.PRIMARY}
                                size={ButtonSize.MEDIUM}
                            >
                                <span>+</span>
                                <span>Add transaction</span>
                            </Button>
                            <div className={styles.buttons}>
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
                            </div>
                        </div>
                        <RangeCalendar />
                    </div>
                    <div className={styles.filters}>
                        <div className={styles.filtersContainer}>
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
                                    <div className={styles.categoryText}>
                                        By category
                                    </div>
                                    <div className={styles.dropdown}>
                                        <MultiDropdown
                                            data={categories}
                                            selectedOption={categoriesDropdown}
                                            handleChange={
                                                handleCategoriesMultiDropdownChange
                                            }
                                        />
                                    </div>
                                </div>
                                <div className={styles.filter}>
                                    <div className={styles.categoryText}>
                                        By people
                                    </div>
                                    <div className={styles.dropdown}>
                                        <MultiDropdown
                                            data={people}
                                            selectedOption={peopleDropdown}
                                            handleChange={
                                                handlePeopleMultiDropdownChange
                                            }
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
