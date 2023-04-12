import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BaseModal, Button } from '~/bundles/common/components/components';
import { DEFAULT_TRANSACTION } from '~/bundles/common/components/transaction-modal/constants/constants';
import { TransactionImage } from '~/bundles/common/components/transaction-modal/transaction-image';
import { TransactionModalBody } from '~/bundles/common/components/transaction-modal/transaction-modal-body';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonType } from '~/bundles/common/enums/button-type.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { TransactionModalType } from '~/bundles/common/enums/transaction-modal-type.enum';
import {
    useAppDispatch,
    useAppSelector,
    useCallback,
    useState,
} from '~/bundles/common/hooks/hooks';
import { loadCategories } from '~/bundles/common/stores/categories/actions';
import { actions as transactionActions } from '~/bundles/common/stores/transactions/';
import { type DataType } from '~/bundles/common/types/dropdown.type';
import { type Transaction } from '~/bundles/common/types/transaction.type';
import { actions as currenciesActions } from '~/bundles/currencies/store/';

import styles from './styles.module.scss';

type Properties = {
    type: TransactionModalType;
    handleCancel: () => void;
    active: boolean;
    transactionId?: string;
};

const labels: DataType[] = [
    { value: 'food', name: 'food' },
    { value: 'cafe', name: 'cafe' },
];

const TransactionModal: React.FC<Properties> = ({
    type,
    handleCancel,
    active,
    transactionId,
}) => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { currencies } = useAppSelector((state) => state.currencies);
    const { user } = useAppSelector((state) => state.users);
    const matchingCurrency = currencies.find(
        (currency) => currency.shortName === user?.currency,
    );

    const [transaction, setTransaction] =
        useState<Transaction>(DEFAULT_TRANSACTION);

    const [imageFile, setImageFile] = useState<File | undefined>();

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const file = event.target.files?.[0];
            setImageFile(file);
        },
        [],
    );

    const handleDelete = useCallback(() => {
        void dispatch(
            transactionActions.deleteTransaction(transactionId as string),
        );
        handleCancel();
    }, [dispatch, handleCancel, transactionId]);

    const submitButtonName =
        type === TransactionModalType.CHANGE ? 'Save' : 'Add';

    const handleSubmit = useCallback(() => {
        if (id) {
            transaction.walletsId = id;
        }
        transaction.currencyId = matchingCurrency?.id as string;
        if (type === TransactionModalType.ADD) {
            void dispatch(transactionActions.createTransaction(transaction));
        }
        if (type === TransactionModalType.CHANGE) {
            void dispatch(
                transactionActions.updateTransaction({
                    id: transactionId as string,
                    payload: transaction,
                }),
            );
        }
        void dispatch(transactionActions.loadTransactions());
        handleCancel();
    }, [
        dispatch,
        handleCancel,
        id,
        matchingCurrency?.id,
        transaction,
        transactionId,
        type,
    ]);

    const category = useAppSelector(
        (state) => state.categories.categories?.items ?? [],
    );
    const categoryMenu = category.map((item) => ({
        ...item,
        value: item.id,
    }));

    // maybe we will need this in the future
    // const currency = useAppSelector((state) => state.currencies.currencies);
    // const currencyMenu = currency.map((item) => ({
    //     ...item,
    //     value: item.id,
    // }));

    useEffect(() => {
        void dispatch(loadCategories());
        void dispatch(currenciesActions.loadAll());
    }, [dispatch]);

    return (
        <BaseModal
            isShown={active}
            onClose={handleCancel}
            onSubmit={handleSubmit}
            Body={
                <TransactionModalBody
                    categories={categoryMenu}
                    labels={labels}
                    handleChangeTransaction={setTransaction}
                />
            }
            submitButtonName={submitButtonName}
        >
            <div className={styles.buttonsContainer}>
                <TransactionImage
                    file={imageFile}
                    handleFileChange={handleFileChange}
                />
                {type === TransactionModalType.CHANGE && (
                    <Button
                        onClick={handleDelete}
                        className={styles.delete}
                        type={ButtonType.BUTTON}
                        size={ButtonSize.SMALL}
                        variant={ButtonVariant.SECONDARY}
                    >
                        Delete Transaction
                    </Button>
                )}
            </div>
        </BaseModal>
    );
};

export { TransactionModal };
