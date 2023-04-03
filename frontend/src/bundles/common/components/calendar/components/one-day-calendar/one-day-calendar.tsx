import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import React, { useState } from 'react';
import { Calendar } from 'react-date-range';

import calendarIcon from '~/assets/img/calendar-icon.svg';
import styles from '~/bundles/common/components/calendar/styles.module.scss';
import { Button } from '~/bundles/common/components/components.js';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums.js';
import { formatOneDay } from '~/bundles/common/helpers/helpers.js';
import { useCallback } from '~/bundles/common/hooks/hooks.js';

const OneDayCalendar: React.FC = () => {
    const [day, setDay] = useState<Date>(new Date());
    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    const handleClick = useCallback((): void => {
        setIsShowModal(!isShowModal);
    }, [isShowModal]);

    const handleSelectDay = useCallback((day: Date): void => {
        setIsShowModal(false);
        setDay(day);
    }, []);

    return (
        <div className={styles.calendar_wrapper}>
            <Button
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

            {isShowModal ? (
                <>
                    <input
                        onClick={handleClick}
                        className={styles.overlay}
                    ></input>
                    <div className={styles.modal_one_day}>
                        <Calendar date={day} onChange={handleSelectDay} />
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export { OneDayCalendar };
