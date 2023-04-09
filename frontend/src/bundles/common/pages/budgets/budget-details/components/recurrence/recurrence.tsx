import { useCallback } from 'react';

import { recurrences } from '../../enums/enums.js';
import { type Recurrence } from '../../types/types.js';
import styles from './styles.module.scss';

type RecurrenceProperties = {
    recurrences: Recurrence[];
    onChange: (value: string) => void;
    selectedRecurrence?: string;
};

const Recurrence = ({
    recurrences,
    selectedRecurrence,
    onChange,
}: RecurrenceProperties): JSX.Element => {
    const handleRecurrenceClick = useCallback(
        (recurrenceValue: string): void => {
            if (selectedRecurrence === recurrenceValue) {
                onChange('');
            } else {
                onChange(recurrenceValue);
            }
        },
        [onChange, selectedRecurrence],
    );

    const handleKeyDown = useCallback(
        (
            event: React.KeyboardEvent<HTMLDivElement>,
            recurrenceValue: string,
        ): void => {
            if (event.key === 'Enter' || event.key === ' ') {
                handleRecurrenceClick(recurrenceValue);
            }
        },
        [handleRecurrenceClick],
    );

    const handleClickWrapper = useCallback(
        (recurrenceValue: string) => () =>
            handleRecurrenceClick(recurrenceValue),
        [handleRecurrenceClick],
    );

    const handleKeyDownWrapper = useCallback(
        (recurrenceValue: string) =>
            (event: React.KeyboardEvent<HTMLDivElement>) => {
                handleKeyDown(event, recurrenceValue);
            },
        [handleKeyDown],
    );

    return (
        <div className={styles.recurrenceContainer}>
            {recurrences.map((recurrence) => (
                <div
                    key={recurrence.value}
                    onClick={handleClickWrapper(recurrence.value)}
                    onKeyDown={handleKeyDownWrapper(recurrence.value)}
                    role="button"
                    tabIndex={0}
                    className={`${styles.recurrenceButton} ${
                        selectedRecurrence === recurrence.value
                            ? styles.recurrenceButtonSelected
                            : styles.recurrenceButtonUnselected
                    }`}
                >
                    {recurrence.label}
                </div>
            ))}
        </div>
    );
};

const RenderRecurrence = ({
    field: { onChange, value },
}: {
    field: { onChange: (value: string) => void; value: string };
}): JSX.Element => {
    const handleRecurrenceChange = useCallback(
        (value: string): void => {
            onChange(value);
        },
        [onChange],
    );
    return (
        <Recurrence
            recurrences={recurrences}
            selectedRecurrence={value}
            onChange={handleRecurrenceChange}
        />
    );
};

export { Recurrence, RenderRecurrence };
