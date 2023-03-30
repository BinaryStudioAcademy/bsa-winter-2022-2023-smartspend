import { useForm } from 'react-hook-form';

import { Input } from '~/bundles/common/components/components';
import { Dropdown } from '~/bundles/common/components/dropdown/dropdown';
import { InputType } from '~/bundles/common/enums/enums';
import { useState } from '~/bundles/common/hooks/hooks';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from './styles.module.scss';

type Properties = {
    onClick: (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void;
    handleKeyDown: (event: React.KeyboardEvent<HTMLDivElement>) => void;
};

type InputValues = {
    name: string;
};

const mock = [
    { value: '' }
];

const Form: React.FC<Properties>= ({ onClick, handleKeyDown }) => {

    const [selectedSingle, setSelectedSingle] = useState<DataType>(mock[0]);
    const { control, formState: { errors }, watch } = useForm<InputValues>({
        defaultValues: { name: '' }
    });

    return (
        <div>
            <div>
                <span className={styles.title}>Create a new category</span>
            </div>
            <div className={styles.form} role='button' tabIndex={0} onClick={onClick} onKeyDown={handleKeyDown}>
                <form name="categoryNewForm" autoComplete="off">
                    <div className={styles.wrapperSettings}>
                        <div className={styles.wrapperSelect}>
                            <span className={styles.inputLabel}>Icon</span>
                                <Dropdown
                                data={mock}
                                selectedOption={selectedSingle}
                            />
                        </div>
                        <div className={styles.wrapperSelect}>
                            <span className={styles.inputLabel}>Color</span>
                            <Dropdown
                                data={mock}
                                selectedOption={selectedSingle}
                            />
                        </div>
                        <div className={styles.wrapperSelect}>
                            <Input
                                control={control}
                                errors={errors}
                                label="Name"
                                name="name"
                                placeholder="New category name"
                                type={InputType.TEXT}
                                isDisabled={false}
                                labelClassName={styles.inputLabelColor}
                            />
                        </div>
                        <div className={styles.wrapperSelect}>
                            <span className={styles.inputLabel}>Type</span>
                            <Dropdown
                                data={mock}
                                selectedOption={selectedSingle}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export { Form };

