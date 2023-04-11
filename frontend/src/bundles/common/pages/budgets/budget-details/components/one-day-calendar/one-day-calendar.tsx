import { useCallback, useEffect, useState } from 'react';
import { Calendar } from 'react-date-range';
import {
    type FieldErrors,
    type FieldValues,
    type UseControllerProps,
} from 'react-hook-form';
import { Controller } from 'react-hook-form';

import calendarIcon from '~/assets/img/calendar-icon.svg';
import { Button } from '~/bundles/common/components/components';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { formatOneDay } from '~/bundles/common/helpers/helpers';

import styles from './styles.module.scss';

interface OneDayCalendarProperties {
    selectedDate: Date;
    onChange: (date: Date) => void;
}

const OneDayCalendar: React.FC<OneDayCalendarProperties> = ({
    selectedDate,
    onChange,
}) => {
    const [day, setDay] = useState<Date>(selectedDate);
    const [isShowModal, setIsShowModal] = useState<boolean>(false);

    const handleClick = useCallback(() => {
        setIsShowModal(!isShowModal);
    }, [isShowModal]);

    const handleKeyDown = useCallback(
        (event: { key: string }) => {
            if (event.key === 'Enter' || event.key === ' ') {
                handleClick();
            }
        },
        [handleClick],
    );

    const handleSelectDay = useCallback(
        (date: Date) => {
            setIsShowModal(false);
            setDay(date);
            onChange(date);
        },
        [onChange],
    );

    useEffect(() => {
        setDay(selectedDate);
    }, [selectedDate]);

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

            {isShowModal && (
                <>
                    <button
                        className={styles.overlayButton}
                        onClick={handleClick}
                        onKeyDown={handleKeyDown}
                    ></button>
                    <div className={styles.modal_one_day}>
                        <Calendar date={day} onChange={handleSelectDay} />
                    </div>
                </>
            )}
        </div>
    );
};

const RenderStartDate = ({
    field: { onChange },
}: {
    field: { onChange: (value: Date) => void; value: string };
}): JSX.Element => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleDateChange = useCallback(
        (date: Date): void => {
            setSelectedDate(date);
            onChange(date);
        },
        [onChange],
    );

    return (
        <OneDayCalendar
            selectedDate={selectedDate}
            onChange={handleDateChange}
        />
    );
};

interface RenderEndDateProperties<T extends FieldValues>
    extends UseControllerProps<T> {
    error: FieldErrors<T>;
}

const RenderEndDate = <T extends FieldValues>({
    name,
    control,
    error,
}: RenderEndDateProperties<T>): JSX.Element => {
    const defaultDate = new Date();
    const [selectedDate, setSelectedDate] = useState<Date>(defaultDate);

    const message = error.endDate?.message;

    const hasError = Boolean(error);
    interface Field {
        onChange: (value: Date) => void;
        value: string | undefined;
    }

    const handleDateChange = useCallback((date: Date): void => {
        setSelectedDate(date);
    }, []);

    const handleChange = useCallback(
        (field: Field) => (date: Date) => {
            handleDateChange(date);
            field.onChange(date);
        },
        [handleDateChange],
    );

    const handleRender = useCallback(
        ({ field }: { field: Field }) => (
            <div>
                <OneDayCalendar
                    selectedDate={selectedDate}
                    onChange={handleChange(field)}
                />
                {hasError && (
                    <span style={{ color: 'red' }}>{message as string}</span>
                )}
            </div>
        ),
        [selectedDate, handleChange, hasError, message],
    );

    return <Controller name={name} control={control} render={handleRender} />;
};

export { RenderEndDate, RenderStartDate };
