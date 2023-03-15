import 'rc-slider/assets/index.css';

import Slider from 'rc-slider';
import React, { useCallback, useState } from 'react';

import styles from './range-slider.module.scss';

interface FinanceOperation {
    amount: number;
}

interface RangeSliderProperties {
    data: FinanceOperation[];
    onChange?: (filteredData: FinanceOperation[]) => void;
}

const RangeSlider: React.FC<RangeSliderProperties> = ({ data, onChange }) => {
    const [range, setRange] = useState([0, 500]);

    const handleSliderChange = useCallback(
        (value: number[]): void => {
            const newRange = value;
            setRange(newRange);
            if (onChange) {
                const filteredData = data.filter(
                    (item) =>
                        item.amount >= newRange[0] &&
                        item.amount <= newRange[1],
                );
                onChange(filteredData);
            }
        },
        [data, onChange],
    );

    return (
        <div className={styles.sliderWrapper}>
            <Slider
                range
                min={-100}
                max={1000}
                defaultValue={[0, 500]}
                onChange={
                    handleSliderChange as (value: number | number[]) => void
                }
            />
            <div className={styles.rangeValues}>
                <span>{range[0]}</span>
                <span>{range[1]}</span>
            </div>
        </div>
    );
};

export { RangeSlider };
