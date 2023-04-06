import { BaseModal, Button } from '~/bundles/common/components/components';
import { TransactionImage } from '~/bundles/common/components/transaction-modal/transaction-image';
import { TransactionModalBody } from '~/bundles/common/components/transaction-modal/transaction-modal-body';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonType } from '~/bundles/common/enums/button-type.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { TransactionModalType } from '~/bundles/common/enums/transaction-modal-type.enum';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';
import { type DataType } from '~/bundles/common/types/dropdown.type';

import styles from './styles.module.scss';

type Properties = {
    type: TransactionModalType;
};

const categories: DataType[] = [
    { value: 'salary', name: 'salary' },
    { value: 'freelance', name: 'freelance' },
];

const currency: DataType[] = [
    { value: 'USD', name: 'USD' },
    { value: 'UAH', name: 'UAH' },
];

const labels: DataType[] = [
    { value: 'food', name: 'food' },
    { value: 'cafe', name: 'cafe' },
];

const TransactionModal: React.FC<Properties> = ({ type }) => {
    const [active, setActive] = useState(true);
    const [imageFile, setImageFile] = useState<File | undefined>();

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const file = event.target.files?.[0];
            setImageFile(file);
        },
        [],
    );

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);

    return (
        <BaseModal
            isShown={active}
            onClose={handleCancel}
            onSubmit={handleCancel}
            Body={
                <TransactionModalBody
                    categories={categories}
                    currency={currency}
                    labels={labels}
                />
            }
            submitButtonName={'Save changes'}
        >
            <TransactionImage
                file={imageFile}
                handleFileChange={handleFileChange}
            />
            {type === TransactionModalType.CHANGE && (
                <Button
                    className={styles.delete}
                    type={ButtonType.SUBMIT}
                    size={ButtonSize.SMALL}
                    variant={ButtonVariant.SECONDARY}
                >
                    Delete Transaction
                </Button>
            )}
        </BaseModal>
    );
};

export { TransactionModal };
