import { BaseModal, Button } from '~/bundles/common/components/components';
import { TransactionImage } from '~/bundles/common/components/transaction-modal/transaction-image';
import { TransactionModalBody } from '~/bundles/common/components/transaction-modal/transaction-modal-body';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonType } from '~/bundles/common/enums/button-type.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { TransactionModalType } from '~/bundles/common/enums/transaction-modal-type.enum';
import {
    useAppDispatch,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { type DataType } from '~/bundles/common/types/dropdown.type';
import {
    createTransaction,
    deleteTransaction,
    updateTransaction,
} from '~/bundles/transactions/store/actions';

import styles from './styles.module.scss';

type Properties = {
    type: TransactionModalType;
    handleCancel: () => void;
    active: boolean;
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

const TransactionModal: React.FC<Properties> = ({
    type,
    handleCancel,
    active,
}) => {
    const dispatch = useAppDispatch();
    const [imageFile, setImageFile] = useState<File | undefined>();

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const file = event.target.files?.[0];
            setImageFile(file);
        },
        [],
    );

    const submitButtonName =
        type === TransactionModalType.CHANGE
            ? 'Save changes'
            : 'Add transaction';

    const handleSubmit = useCallback(() => {
        if (type === TransactionModalType.ADD) {
            void dispatch(
                createTransaction({
                    categoryId: 'c1794d19-f31d-4a36-9d26-6f6c3c36db7d',
                    date: new Date(),
                    note: 'transaction note',
                    labelId: '059dc814-89cc-4ba1-89da-b20c5bf78231',
                    amount: 1000,
                    currencyId: 'b96bc385-9f98-48f2-824a-c2e20823c563',
                }),
            );
        }
        if (type === TransactionModalType.CHANGE) {
            void dispatch(
                updateTransaction({
                    categoryId: 'c1794d19-f31d-4a36-9d26-6f6c3c36db7d',
                    date: new Date(),
                    note: 'string',
                    labelId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
                    amount: 1000,
                }),
            );
        }
    }, [dispatch, type]);

    const handleDeleteTransaction = useCallback(() => {
        void dispatch(deleteTransaction({ id: 'kjashdflkjsdfh' }));
    }, [dispatch]);

    return (
        <BaseModal
            isShown={active}
            onClose={handleCancel}
            onSubmit={handleSubmit}
            Body={
                <TransactionModalBody
                    categories={categories}
                    currency={currency}
                    labels={labels}
                />
            }
            submitButtonName={submitButtonName}
        >
            <TransactionImage
                file={imageFile}
                handleFileChange={handleFileChange}
            />
            {type === TransactionModalType.CHANGE && (
                <Button
                    className={styles.delete}
                    type={ButtonType.BUTTON}
                    size={ButtonSize.SMALL}
                    variant={ButtonVariant.SECONDARY}
                    onClick={handleDeleteTransaction}
                >
                    Delete Transaction
                </Button>
            )}
        </BaseModal>
    );
};

export { TransactionModal };
