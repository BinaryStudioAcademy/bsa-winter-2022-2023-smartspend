import { Calendar } from '~/bundles/common/components/calendar/calendar';
import { Input } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/dropdown';
import { DEFAULT_TRANSACTION } from '~/bundles/common/components/transaction-modal/constants/constants';
import { TransactionModalElement } from '~/bundles/common/components/transaction-modal/transaction-modal-element';
import { InputType } from '~/bundles/common/enums/input-type.enum';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { useAppForm } from '~/bundles/common/hooks/use-app-form/use-app-form.hook';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from './styles.module.scss';

interface Properties {
    categories: DataType[];
    currency: DataType[];
    labels: DataType[];
}

const TransactionModalBody: React.FC<Properties> = ({
    categories,
    currency,
    labels,
}) => {
    const { control, errors } = useAppForm({
        defaultValues: DEFAULT_TRANSACTION,
    });

    const [selectedSingleCategory, setSelectedSingleCategory] =
        useState<DataType>(categories[0]);

    const handleDropdownChangeCategory = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingleCategory(selectedOption);
            }
        },
        [],
    );

    const [selectedSingleCurrency, setSelectedSingleCurrency] =
        useState<DataType>(currency[0]);

    const handleDropdownChangeCurrency = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingleCurrency(selectedOption);
            }
        },
        [],
    );

    const [selectedSingleLabel, setSelectedSingleLabel] = useState<DataType>(
        labels[0],
    );

    const handleDropdownChangeLabel = useCallback(
        (selectedOption: DataType | null) => {
            if (selectedOption !== null) {
                setSelectedSingleLabel(selectedOption);
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
                    selectedOption={selectedSingleCategory}
                    handleChange={handleDropdownChangeCategory}
                />
            </TransactionModalElement>
            <TransactionModalElement className={styles.date} label="Date">
                <Calendar isRangeCalendar={false} />
            </TransactionModalElement>
            <TransactionModalElement className={styles.note} label="By note">
                <Input
                    inputClassName={styles.note}
                    type={InputType.TEXT}
                    placeholder="Write note"
                    name="note"
                    control={control}
                    errors={errors}
                />
            </TransactionModalElement>
            <TransactionModalElement className={styles.label} label="Label">
                <Dropdown
                    data={labels}
                    selectedOption={selectedSingleLabel}
                    handleChange={handleDropdownChangeLabel}
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
                    selectedOption={selectedSingleCurrency}
                    handleChange={handleDropdownChangeCurrency}
                />
            </TransactionModalElement>
        </div>
    );
};

export { TransactionModalBody };
