import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import React, { useState } from 'react';
import { type Range, type RangeKeyDict } from 'react-date-range';
import { DateRangePicker } from 'react-date-range';

import calendarIcon from '~/assets/img/calendar-icon.svg';
import leftArrow from '~/assets/img/left-arrow.svg';
import rightArrow from '~/assets/img/right-arrow.svg';
import { useCallback } from '~/bundles/common/hooks/hooks';

import { ButtonSize } from '../../enums/button-size.enum';
import { ButtonVariant } from '../../enums/button-variant.enum';
import {
    formatRange,
    getBackwardMonths,
    getForwardMonths,
    getInitialRange,
} from '../../helpers/helpers';
import { Button } from '../components';
import styles from './styles.module.scss';

const RangeCalendar: React.FC = () => {
    const [isShowModal, setIsShowModal] = useState<boolean>(false);
    const [range, setRange] = useState<Range>(getInitialRange());

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
                    setRange(getForwardMonths(range));

                    break;
                }
                case 'backward': {
                    setRange(getBackwardMonths(range));

                    break;
                }
                default: {
                    setIsShowModal(!isShowModal);
                }
            }
        },
        [isShowModal, range],
    );

    const handleSelectRange = useCallback(
        //з кастомного календаря DateRangePicker приходить один з кастомних типів(DateRange, RangeKeyDict) .
        //FIX: спробувати прокинути всюди тип RangeKeyDict
        //FIX: спробувати використовувати тип Range з бібліотеки. Лише тоді в данних що будуть передаватись прибрати, на самому початку, поле "selection"

        (range: RangeKeyDict): void => {
            const newRange: Range = {
                startDate: range.selection.startDate,
                key: 'selection',
                endDate: range.selection.endDate,
            };
            setRange(newRange);
        },
        [],
    );

    return (
        <div className={styles.calendar_wrapper}>
            <Button
                className={styles.calendar}
                variant={ButtonVariant.PLAIN}
                size={ButtonSize.MEDIUM}
                onClick={handleClick}
            >
                <div className={styles.range_display}>
                    <img
                        className={styles.arrow_left}
                        id="backward"
                        src={leftArrow}
                        alt="left-arrow"
                    />

                    <div id="range_date">{formatRange(range)}</div>

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
                        <DateRangePicker
                            className={styles.modal}
                            ranges={[range]}
                            onChange={handleSelectRange}
                            months={2}
                            moveRangeOnFirstSelection={false}
                            direction="horizontal"
                        />
                        <Button
                            className={styles.button}
                            variant={ButtonVariant.PRIMARY}
                            size={ButtonSize.SMALL}
                            onClick={handleClick}
                        >
                            Close
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
