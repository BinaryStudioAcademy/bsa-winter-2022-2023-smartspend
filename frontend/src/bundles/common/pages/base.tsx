import React from 'react';
import { type MultiValue, type SingleValue } from 'react-select';
import {
    type UserSignInRequestDto,
    userSignInValidationSchema,
} from 'shared/build/index.js';

import { DEFAULT_SIGN_UP_PAYLOAD } from '~/bundles/auth/components/sign-up-form/constants/constants.js';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import { Calendar } from '../components/calendar/calendar';
import {
    BaseModal,
    Button,
    CardTotal,
    Chart,
    DoughnutChart,
    Dropdown,
    Header,
    Input,
    LineChart,
    Loader,
    MultiDropdown,
    TransactionTable,
} from '../components/components.js';
import { RangeSlider } from '../components/range-slider/range-slider';
import { Tabs } from '../components/tabs/tabs';
import { UserSettingsTabs } from '../components/user-settings-tabs/user-settings-tabs';
import { ButtonSize } from '../enums/button-size.enum';
import { ButtonVariant } from '../enums/button-variant.enum.js';
import { CardVariant } from '../enums/card-variant.enum';
import { AppRoute, InputType } from '../enums/enums.js';
import { useAppForm } from '../hooks/hooks.js';
import { type DataType } from '../types/dropdown.type';

const tabsData = [
    { title: 'Transactions', to: '/ui/' },
    { title: 'Overview', to: '/ui/overview' },
    { title: 'Budgets', to: '/ui/budget' },
    { title: 'Wallet Settings', to: '/ui/wallet-settings' },
];

const userSettingsData = [
    { title: 'Account', to: '/ui/' },
    { title: 'All Categories', to: '/ui/categories' },
    { title: 'Connected bank accounts', to: '/ui/accounts' },
    { title: 'Support', to: '/ui/support' },
    { title: 'Terms and Policies', to: '/ui/terms' },
];

const categories = [
    // props to Doughnut Chart
    {
        total: 1150,
        color: 'linear-gradient(95.5deg, #284B9F 0%, #102E68 100%)',
    },
    {
        total: 1825,
        color: 'linear-gradient(96.2deg, #FECC66 -30.03%, #F83062 95.13%)',
    },
    {
        total: 1325,
        color: 'linear-gradient(96.2deg, #FE66E6 -30.03%, #6933DD 95.13%)',
    },
    {
        total: 2425,
        color: 'linear-gradient(91.64deg, #FCE302 -1.67%, #FE5C01 98.41%)',
    },
    {
        total: 1425,
        color: 'linear-gradient(95.77deg, #09F2D6 -14.06%, #09E1FF 101.51%)',
    },
    {
        total: 2225,
        color: 'linear-gradient(95.77deg, #00D7BD -14.06%, #03BFD9 101.51%)',
    },
];

const tabsDashboard = [
    { title: 'Dashboard', to: AppRoute.DASHBOARD },
    { title: 'Budget', to: AppRoute.BUDGETS },
];

//////////////// DROPDOWNs data

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

//////////////// DROPDOWNs data end

const allTabsData = {
    dashboard: tabsDashboard,
    wallets: tabsData,
};

// mock data for range slider

const mockData = [
    { amount: -50 },
    { amount: 100 },
    { amount: 350 },
    { amount: 600 },
    { amount: 900 },
];

const Base: React.FC = () => {
    const [, setIsSelectedTransactions] = useState<string[]>([]);

    const addIdCheckedTransactions = useCallback((id: string): void => {
        setIsSelectedTransactions((previousState) => {
            if (previousState.includes(id)) {
                return previousState.filter(
                    (previousState_) => previousState_ !== id,
                );
            }
            return [...previousState, id];
        });
    }, []);
    const [active, setActive] = useState(false);

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);
    const handleModal = useCallback(() => {
        setActive(true);
    }, []);

    // Range Slider -------------------------------------
    const rangeLimits = { min: -100, max: 1000 };
    const [currentRange, setCurrentRange] = useState(rangeLimits);
    const [filteredData, setFilteredData] = useState(mockData);

    const handleSliderChange = useCallback(
        (range: { min: number; max: number }): void => {
            setCurrentRange(range);

            const newFilteredData = mockData.filter(
                (item) => item.amount >= range.min && item.amount <= range.max,
            );
            setFilteredData(newFilteredData);
        },
        [],
    );
    // end-Range Slider ----------------------------------

    const { control, errors } = useAppForm<UserSignInRequestDto>({
        defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
        validationSchema: userSignInValidationSchema,
        mode: 'onBlur',
    });

    //////////////// Single Dropdown

    const [selectedSingle, setSelectedSingle] = useState<DataType>(people[0]);

    const handleDropdownChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingle(selectedOption);
            }
        },
        [],
    );

    //////////////// Multiselect Dropdown

    const [selectedMulti, setSelectedMulti] = useState<
        MultiValue<DataType> | SingleValue<DataType>
    >([]);

    const handleMultiDropdownChange = useCallback(
        (selectedOption: MultiValue<DataType> | SingleValue<DataType>) => {
            if (selectedOption === null) {
                setSelectedMulti([]);
            } else {
                setSelectedMulti(selectedOption);
            }
        },
        [],
    );

    return (
        <>
            <Header dataTabs={allTabsData} firstName={''} />
            <div style={{ textAlign: 'center', marginTop: '80px' }}>
                <b>Style Guide</b>
                <div>
                    <Tabs tabsData={tabsData} />
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'start',
                        alignItems: 'start',
                        backgroundColor: '#f6f8f9',
                    }}
                >
                    {/* Calendar */}
                    <Calendar isRangeCalendar={true} />
                    <Calendar isRangeCalendar={false} />
                    {/* Calendar */}
                </div>

                <div style={{ margin: '15px' }}>
                    <Dropdown
                        data={people}
                        selectedOption={selectedSingle}
                        handleChange={handleDropdownChange}
                        label={'TestLabel'}
                    />
                </div>

                <div style={{ margin: '15px' }}>
                    <MultiDropdown
                        data={people}
                        selectedOption={selectedMulti}
                        handleChange={handleMultiDropdownChange}
                    />
                </div>

                {/* Buttons */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MEDIUM}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.MEDIUM}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.MEDIUM}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.MEDIUM}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.SMALL}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.SMALL}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.SMALL}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.SECONDARY}
                            size={ButtonSize.SMALL}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button
                            variant={ButtonVariant.PLAIN}
                            size={ButtonSize.SMALL}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                        <Button
                            variant={ButtonVariant.PLAIN}
                            size={ButtonSize.SMALL}
                            disabled={true}
                        >
                            <span>+</span>
                            <span>Button</span>
                            <span>˅</span>
                        </Button>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                        }}
                    >
                        <Button variant={ButtonVariant.ROUND}>+</Button>
                    </div>
                </div>
                {/*------------------------------------ /end Buttons */}
                {/*------------------------------------------- Cards */}
                <div style={{ marginTop: '40px', marginBottom: '40px' }}>
                    <p style={{ textAlign: 'center', marginBottom: '20px' }}>
                        Card Total
                    </p>
                    <div
                        style={{
                            display: 'flex',
                            gap: '20px',
                            justifyContent: 'space-around',
                            alignItems: 'flex-start',
                        }}
                    >
                        <CardTotal
                            title="Total Balance Total Balance Total Balance Total Balance Total Balance"
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
                    <div style={{ width: '500px' }}>
                        <h3>Bar Chart</h3>
                        <Chart
                            array={[
                                [
                                    {
                                        label: 'income',
                                        data: [
                                            {
                                                date: '01 Jan 2022 00:00:00 GMT',
                                                value: 200_000,
                                            },
                                            {
                                                date: '03 Jan 2022 00:00:00 GMT',
                                                value: 250_000,
                                            },
                                            {
                                                date: '03 Feb 2023 00:00:00 GMT',
                                                value: 750_000,
                                            },
                                        ],
                                    },
                                ],
                                [
                                    {
                                        label: 'outcome',
                                        data: [
                                            {
                                                date: '01 Jan 2022 00:00:00 GMT',
                                                value: 100_000,
                                            },
                                            {
                                                date: '03 Jan 2022 00:00:00 GMT',
                                                value: 150_000,
                                            },
                                            {
                                                date: '01 Feb 2023 00:00:00 GMT',
                                                value: 350_000,
                                            },
                                            {
                                                date: '05 Feb 2023 00:00:00 GMT',
                                                value: 250_000,
                                            },
                                        ],
                                    },
                                ],
                            ]}
                        />
                    </div>
                </div>
                {/*--------------------------------------- /end Cards */}
                <div style={{ width: 600, height: 400 }}>
                    <LineChart
                        dataArr={[
                            { date: 'Mar 01,2023', value: 0 },
                            { date: 'Mar 04,2023', value: 4500 },
                            { date: 'Mar 07,2023', value: 6000 },
                            { date: 'Mar 12,2023', value: 7000 },
                            { date: 'Mar 14,2023', value: 7000 },
                            { date: 'Mar 16,2023', value: 7500 },
                            { date: 'Mar 19,2023', value: 5000 },
                            { date: 'Mar 27,2023', value: 6500 },
                            { date: 'Mar 30,2023', value: 5000 },
                        ]}
                    />
                </div>
            </div>
            {/*--------------------------------------- /end Cards */}
            <div style={{ width: 600, height: 400 }}>
                <LineChart
                    dataArr={[
                        { date: 'Mar 01,2023', value: 0 },
                        { date: 'Mar 04,2023', value: 4500 },
                        { date: 'Mar 07,2023', value: 6000 },
                        { date: 'Mar 12,2023', value: 7000 },
                        { date: 'Mar 14,2023', value: 7000 },
                        { date: 'Mar 16,2023', value: 7500 },
                        { date: 'Mar 19,2023', value: 5000 },
                        { date: 'Mar 27,2023', value: 6500 },
                        { date: 'Mar 30,2023', value: 5000 },
                    ]}
                />
            </div>
            <div>
                <button onClick={handleModal}>Open modal window</button>
                <BaseModal
                    isShown={active}
                    onClose={handleCancel}
                    onSubmit={handleCancel}
                    Header={<h1>Simple Modal</h1>}
                    Body={<p>Simple modal</p>}
                    submitButtonName={'Save changes'}
                ></BaseModal>
            </div>
            {/* Doughnut Chart----------------------------------- */}
            <div>
                <p>Doughnut Chart</p>
                <DoughnutChart categories={categories} />
            </div>
            {/* end-Doughnut Chart------------------------------- */}
            <div>
                <div>
                    <form style={{ textAlign: 'left' }}>
                        <Input
                            name="email"
                            type={InputType.EMAIL}
                            label="Email"
                            placeholder="Email"
                            control={control}
                            errors={errors}
                        />

                        <Input
                            name="password"
                            type={InputType.PASSWORD}
                            label="Password"
                            placeholder="Password"
                            control={control}
                            errors={errors}
                        />

                        <Input
                            name="email"
                            type={InputType.PASSWORD}
                            label="Text"
                            placeholder="Password"
                            control={control}
                            errors={errors}
                            isDisabled={true}
                        />
                    </form>
                </div>
            </div>
            <UserSettingsTabs tabsData={userSettingsData} />
            <div>
                <RangeSlider
                    rangeLimits={rangeLimits}
                    currentRange={currentRange}
                    onChange={handleSliderChange}
                />
                <div>
                    <h3>Filtered Data:</h3>
                    {filteredData.map((item, index) => (
                        <p key={index}>{item.amount}</p>
                    ))}
                </div>
            </div>
            <div style={{ background: '#EFF3FF' }}>
                <TransactionTable
                    transactions={[
                        {
                            id: '1',
                            category: {
                                id: 'c7bb6975-4b6c-4699-a4a6-d1f4fdd3d9d5',
                                name: 'Food & Drink',
                                icon: 'burger',
                                color: 'red',
                                type: 'expense',
                            },
                            name: 'faBagShopping',
                            date: '2022-03-23',
                            label: 'Supermarket',
                            amount: -35,
                            currency: '$',
                            walletsId: '49cfd534-7c7f-438c-a6cd-3578b7dfd412',
                        },
                        {
                            id: '2',
                            category: {
                                id: '966ab7c8-b120-4db9-9cc3-2fff43a5143a',
                                name: 'Salary',
                                icon: 'money-bill',
                                color: 'green',
                                type: 'income',
                            },
                            name: 'faCarAlt',
                            date: '2022-03-23',
                            label: 'Gas Station',
                            amount: -50,
                            currency: '$',
                            walletsId: '49cfd534-7c7f-438c-a6cd-3578b7dfd412',
                        },
                    ]}
                    addIdCheckedTransactions={addIdCheckedTransactions}
                />
            </div>
            <Loader />
        </>
    );
};

export { Base };
