import { Calendar } from '~/bundles/common/components/calendar/calendar';
import { Input } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/dropdown';
import {
    DEFAULT_TRANSACTION,
    DROPDOWN_WIDTH,
} from '~/bundles/common/components/transaction-modal/constants/constants';
import { TransactionModalElement } from '~/bundles/common/components/transaction-modal/transaction-modal-element';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from './styles.module.scss';

interface Properties {
    categories: DataType[];
    currency: DataType[];
}

const TransactionModalBody: React.FC<Properties> = ({
    categories,
    currency,
}) => {
    const { control, errors } = useAppForm({
        defaultValues: DEFAULT_TRANSACTION,
    });

    const [selectedSingle, setSelectedSingle] = useState<DataType>(
        categories[0],
    );

    const handleDropdownChange = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingle(selectedOption);
            }
        },
        [],
    );

    return (
        <div className={styles.body}>
            <TransactionModalElement
                className={styles.category}
                label="Category"
            >
                <Dropdown
                    data={categories}
                    selectedOption={selectedSingle}
                    handleChange={handleDropdownChange}
                    width={DROPDOWN_WIDTH}
                />
            </TransactionModalElement>
            <TransactionModalElement className={styles.date} label="Date">
                <Calendar isRangeCalendar={false} />
            </TransactionModalElement>
            <TransactionModalElement className={styles.note} label="By note">
                <Input
                    type={InputType.TEXT}
                    placeholder="Write note"
                    name="note"
                    control={control}
                    errors={errors}
                />
            </TransactionModalElement>
            <TransactionModalElement className={styles.label} label="Label">
                <Dropdown
                    data={categories}
                    selectedOption={selectedSingle}
                    handleChange={handleDropdownChange}
                    width={DROPDOWN_WIDTH}
                />
            </TransactionModalElement>
            <TransactionModalElement className={styles.amount} label="Amount">
                <Input
                    type={InputType.TEXT}
                    placeholder="1000"
                    name="amount"
                    control={control}
                    errors={errors}
                />
            </TransactionModalElement>
            <TransactionModalElement
                className={styles.currency}
                label="Currency"
            >
                <Dropdown
                    data={currency}
                    selectedOption={selectedSingle}
                    handleChange={handleDropdownChange}
                    width={DROPDOWN_WIDTH}
                />
            </TransactionModalElement>
        </div>
    );
};

export { TransactionModalBody };
