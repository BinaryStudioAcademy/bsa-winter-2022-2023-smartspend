import 'rc-slider/assets/index.css';
import '../../../../assets/css/variables/color-variables.css';

import Slider from 'rc-slider';
import React, { useCallback, useState } from 'react';

import styles from './styles.module.scss';

interface RangeSliderProperties {
    onChange?: (range: { min: number; max: number }) => void;
    rangeLimits?: { min: number; max: number };
}

const RangeSlider: React.FC<RangeSliderProperties> = ({
    onChange,
    rangeLimits = { min: -100, max: 1000 },
}) => {
    const [range, setRange] = useState([rangeLimits.min, rangeLimits.max]);

    const handleSliderChange = useCallback(
        (value: number[]): void => {
            const newRange = value as [number, number];
            setRange(newRange);
            if (onChange) {
                onChange({ min: newRange[0], max: newRange[1] });
            }
        },
        [onChange],
    );

    const trackStyle = {
        backgroundColor: 'var(--color-pink-100)',
    };

    const handleStyle = {
        borderColor: 'var(--color-pink-100)',
    };

    return (
        <div className={styles.sliderWrapper}>
            <Slider
                trackStyle={trackStyle}
                handleStyle={[handleStyle, handleStyle]}
                range
                min={rangeLimits.min}
                max={rangeLimits.max}
                defaultValue={[rangeLimits.min, rangeLimits.max]}
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
