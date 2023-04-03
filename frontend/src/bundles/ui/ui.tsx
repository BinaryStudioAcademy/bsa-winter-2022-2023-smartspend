import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type FormEventHandler } from 'react';
import React, { useCallback, useState } from 'react';
import { Collapse } from 'react-collapse';

import {
    BaseModalPart,
    Button,
    ButtonPart,
    CalendarPart,
    CardPart,
    ChartPart,
    DoughnutChartPart,
    DropdownPart,
    HeaderPart,
    InputPart,
    LineChartPart,
    LoaderPart,
    MultiDropdownPart,
    NewWalletModalPart,
    RangeSliderPart,
    TabsPart,
    TransactionTablePart,
    UserSettingsTabsPart,
} from './components/components.js';
import { FaIcons } from './enums/enums.js';
import styles from './styles.module.scss';

type CollapseState = {
    header: boolean;
    tabs: boolean;
    calendar: boolean;
    button: boolean;
    chart: boolean;
    card: boolean;
    lineChart: boolean;
    baseModal: boolean;
    doughnutChart: boolean;
    input: boolean;
    userSettingsTabs: boolean;
    rangeSlider: boolean;
    transactionTable: boolean;
    newWalletModal: boolean;
};

const defaultCollapse: CollapseState = {
    header: false,
    tabs: false,
    calendar: false,
    button: false,
    chart: false,
    lineChart: false,
    baseModal: false,
    doughnutChart: false,
    input: false,
    userSettingsTabs: false,
    rangeSlider: false,
    card: false,
    transactionTable: false,
    newWalletModal: false,
};

const StyleGuide: React.FC = () => {
    const [open, setOpen] = useState(defaultCollapse);
    const handleCollapseChange: FormEventHandler<HTMLButtonElement> =
        useCallback(
            (event: React.ChangeEvent<HTMLButtonElement>) =>
                setOpen({
                    ...open,
                    [event.target.name]:
                        !open[event.target.name as keyof CollapseState],
                }),
            [open],
        );

    const collapseItemsArray = [
        { name: 'header', component: <HeaderPart /> },
        { name: 'tabs', component: <TabsPart /> },
        { name: 'calendar', component: <CalendarPart /> },
        { name: 'button', component: <ButtonPart /> },
        { name: 'barChart', component: <ChartPart /> },
        { name: 'cardTotal', component: <CardPart /> },
        { name: 'lineChart', component: <LineChartPart /> },
        { name: 'baseModal', component: <BaseModalPart /> },
        { name: 'doughnutChart', component: <DoughnutChartPart /> },
        { name: 'input', component: <InputPart /> },
        { name: 'userSettingsTabs', component: <UserSettingsTabsPart /> },
        { name: 'rangeSlider', component: <RangeSliderPart /> },
        { name: 'multiDropdown', component: <MultiDropdownPart /> },
        { name: 'dropdown', component: <DropdownPart /> },
        { name: 'loader', component: <LoaderPart /> },
        { name: 'transactionTable', component: <TransactionTablePart /> },
        { name: 'newWalletModal', component: <NewWalletModalPart /> },
    ];
    return (
        <div>
            <h1>Style Guide</h1>
            <ul className={styles.list}>
                {collapseItemsArray.map((item, index) => (
                    <li className={styles.listItem} key={index}>
                        <div className={styles.collapseLabel}>
                            <Button
                                name={item.name}
                                onClick={handleCollapseChange}
                            >
                                <FontAwesomeIcon
                                    icon={
                                        open[item.name as keyof CollapseState]
                                            ? FaIcons.ARROW_UP
                                            : FaIcons.ARROW_DOWN
                                    }
                                />
                            </Button>
                            <h1>{item.name}</h1>
                        </div>
                        <Collapse
                            isOpened={open[item.name as keyof CollapseState]}
                        >
                            {item.component}
                        </Collapse>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { StyleGuide };
