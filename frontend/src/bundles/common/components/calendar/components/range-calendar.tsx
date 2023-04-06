import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import React, { useState } from 'react';
import { type Range, type RangeKeyDict } from 'react-date-range';
import { DateRange } from 'react-date-range';

import calendarIcon from '~/assets/img/calendar-icon.svg';
import leftArrow from '~/assets/img/left-arrow.svg';
import rightArrow from '~/assets/img/right-arrow.svg';
import { Button } from '~/bundles/common/components/components';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums';
import {
    formatRange,
    getFutureDate,
    getInitialRange,
    getPastDate,
} from '~/bundles/common/helpers/helpers';
import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from '../styles.module.scss';

interface MyComponentProperties {
    onRangeChange?: (day: Range) => void;
    initialRange?: Range;
}

const RangeCalendar: React.FC<MyComponentProperties> = ({
    onRangeChange,
    initialRange,
}) => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [range, setRange] = useState<Range>(
        initialRange ?? getInitialRange(),
    );

    const handleClick = useCallback(
        (
            event: React.MouseEvent<HTMLButtonElement | HTMLInputElement>,
        ): void => {
            const target = event.target as HTMLElement;
            switch (target.id) {
                case 'range_date': {
                    setIsShowModal(!isShowModal);

                    break;
                }
                case 'forward': {
                    setRange(getFutureDate(range));
                    onRangeChange?.(getFutureDate(range));
                    break;
                }
                case 'backward': {
                    setRange(getPastDate(range));
                    onRangeChange?.(getPastDate(range));
                    break;
                }
                default: {
                    setIsShowModal(!isShowModal);
                }
            }
        },
        [isShowModal, range, onRangeChange],
    );

    const handleSelectRange = useCallback(
        (range: RangeKeyDict): void => {
            const newRange: Range = {
                startDate: range.selection.startDate,
                key: 'selection',
                endDate: range.selection.endDate,
                color: '#03bfd9',
            };
            setRange(newRange);
            onRangeChange?.(newRange);
        },
        [onRangeChange],
    );

    return (
        <div className={styles.calendar_wrapper}>
            <Button
                className={styles.calendar}
                variant={ButtonVariant.PLAIN}
                size={ButtonSize.MEDIUM}
                onClick={handleClick}
            >
                <div className={styles.range_wrapper}>
                    <img
                        className={styles.arrow_left}
                        id="backward"
                        src={leftArrow}
                        alt="left-arrow"
                    />

                    <div className={styles.range_display} id="range_date">
                        {formatRange(range)}
                    </div>

                    <img
                        className={styles.arrow_right}
                        id="forward"
                        src={rightArrow}
                        alt="left-arrow"
                    />
                </div>

                <img
                    className={styles.icon}
                    src={calendarIcon}
                    alt="calendar-icon"
                />
            </Button>
            {isShowModal ? (
                <>
                    <input
                        onClick={handleClick}
                        className={styles.overlay}
                    ></input>
                    <div className={styles.modal_range}>
                        <DateRange
                            className={styles.modal}
                            ranges={[range]}
                            onChange={handleSelectRange}
                            months={2}
                            moveRangeOnFirstSelection={false}
                            direction="vertical"
                        />
                        <Button
                            className={styles.button}
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.SMALL}
                            onClick={handleClick}
                        >
                            Select
                        </Button>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export { RangeCalendar };
