import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import React, { useState } from 'react';
import { Calendar } from 'react-date-range';

import calendarIcon from '~/assets/img/calendar-icon.svg';
import { Button } from '~/bundles/common/components/components';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
} from '~/bundles/common/enums/enums';
import { formatOneDay } from '~/bundles/common/helpers/helpers';
import { useCallback } from '~/bundles/common/hooks/hooks';
import { type Transaction } from '~/bundles/common/types/transaction.type';

import styles from '../styles.module.scss';

type Properties = {
    onChange?: React.Dispatch<React.SetStateAction<Transaction>>;
};

const OneDayCalendar: React.FC<Properties> = ({ onChange }) => {
    const [day, setDay] = useState<Date>(new Date());
    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    const handleClick = useCallback((): void => {
        setIsShowModal(!isShowModal);
    }, [isShowModal]);

    const handleSelectDay = useCallback(
        (day: Date): void => {
            setIsShowModal(false);
            setDay(day);
            onChange?.((previousState) => {
                return {
                    ...previousState,
                    date: day,
                };
            });
        },
        [onChange],
    );

    return (
        <>
            <Button
                type={ButtonType.BUTTON}
                className={styles.calendar}
                variant={ButtonVariant.PLAIN}
                size={ButtonSize.MEDIUM}
                onClick={handleClick}
            >
                {formatOneDay(day)}
                <img
                    className={styles.icon}
                    src={calendarIcon}
                    alt="calendar-icon"
                />
            </Button>

            {isShowModal && (
                <div className={styles.calendar_wrapper}>
                    <input onClick={handleClick} className={styles.overlay} />
                    <div className={styles.modal_one_day}>
                        <Calendar
                            date={day}
                            onChange={handleSelectDay}
                            color="#03bfd9"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export { OneDayCalendar };
