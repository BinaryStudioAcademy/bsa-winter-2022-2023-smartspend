import React, { useCallback } from 'react';

import { Dropdown } from '../components/dropdown/dropdown';
import { DropdownType } from '../enums/dropdown-type.enum';

const Base: React.FC = () => {
    const testOptions1 = [
        'Test option 1',
        'Test option 2',
        'Test option 3',
        'Test option 4',
        'Test option 5',
    ];

    const onSelectChange = useCallback((selectValues: string[]): void => {
        // console.log(selectValues);
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
            <div>
                <Dropdown
                    options={testOptions1}
                    type={DropdownType.SIMPLE}
                    onChange={onSelectChange}
                ></Dropdown>
            </div>
            {/* <div>
                <Dropdown
                    options={testOptions1}
                    type={DropdownType.MULTISELECT}
                    onChange={onSelectChange}
                ></Dropdown>
            </div> */}
        </div>
    );
};

export { Base };
