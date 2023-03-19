/* eslint-disable */

import React, { useCallback, useState } from 'react';

import {
    type OptionProperties,
    Dropdown,
} from '../components/dropdown/dropdown';
import { DropdownType } from '../enums/dropdown-type.enum';

const Base: React.FC = () => {
    const testData: OptionProperties[] = [
        { id: 'option1', value: 'option1value', label: 'Option 1' },
        { id: 'option2', value: 'option2value', label: 'Option 2' },
        { id: 'option3', value: 'option3value', label: 'Option 3' },
        { id: 'option4', value: 'option4value', label: 'Option 4' },
        { id: 'option5', value: 'option5value', label: 'Option 5' },
    ];

    const testData2: OptionProperties[] = [
        {
            id: 'option1',
            value: 'option1value',
            label: (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span>✫</span>
                    <span>Option 1</span>
                </div>
            ),
        },
        {
            id: 'option2',
            value: 'option2value',
            label: (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span>۞</span>
                    <span>Option 2</span>
                </div>
            ),
        },
        {
            id: 'option3',
            value: 'option3value',
            label: (
                <div style={{ display: 'flex', gap: '20px' }}>
                    <span>✌️</span>
                    <span>Option 3</span>
                </div>
            ),
        },
    ];

    const [selectedData, setSelectedData] = useState<OptionProperties[]>([]);

    const [selectedData2, setSelectedData2] = useState<OptionProperties>();

    const handleTestDataChange = useCallback((selectedData: any): void => {
        setSelectedData(selectedData);
    }, []);

    const handleTestDataChange2 = useCallback((selectedData: any): void => {
        setSelectedData2(selectedData);
    }, []);

    return (
        <div
            style={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '20px',
            }}
        >
            <div style={{ display: 'flex', gap: '20px' }}>
                {' '}
                <Dropdown
                    options={testData}
                    defaultPlaceholder={'SomePlaceHolder1'}
                    onChange={handleTestDataChange}
                    type={DropdownType.MULTI}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {selectedData.map((data) => (
                        <span key={data.id}>{data.label}</span>
                    ))}
                </div>
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
                {' '}
                <Dropdown
                    options={testData2}
                    defaultPlaceholder={'SomePlaceHolder2'}
                    onChange={handleTestDataChange2}
                    type={DropdownType.SINGLE}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {selectedData2?.label}
                </div>
            </div>
        </div>
    );
};

export { Base };
