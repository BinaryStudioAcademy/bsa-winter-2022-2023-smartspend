import { type ChangeEvent } from 'react';

import { BaseModal } from '~/bundles/common/components/components';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums';
import { useState } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

type Properties = {
    isShown: boolean;
    onClose: () => void;
    onDelete: () => void;
};

const UserDeleteCheckboxesText = [
    'I understand that all my wallets will be permanently deleted.',
    'I understand that all my transactions, budgets, and data within these wallets will be permanently deleted.',
    'I understand that this process is permanent and cannot be reverted.',
];

const defaultCheckboxListState: boolean[] = UserDeleteCheckboxesText.map(
    () => false,
);

const UserDeleteModal: React.FC<Properties> = ({
    isShown,
    onClose,
    onDelete,
}) => {
    const [checkboxList, setCheckboxList] = useState<boolean[]>(
        defaultCheckboxListState,
    );

    const handleCheckboxChange = (
        event: ChangeEvent<HTMLInputElement>,
        index: number,
    ): void => {
        const newList = [...checkboxList];
        newList[index] = event.target.checked;
        setCheckboxList(newList);
    };
    return (
        <BaseModal
            isShown={isShown}
            onClose={onClose}
            Header={
                <div className={styles.headerContainer}>
                    <h1 className={styles.headerTitle}>
                        Delete Your SmartSpend Account
                    </h1>
                    <p className={styles.headerSubTitle}>
                        You are about to delete your SmartSpend account. Please
                        confirm that you understand what this means
                    </p>
                </div>
            }
            Body={
                <ul className={styles.listContainer}>
                    {UserDeleteCheckboxesText.map((text, index) => (
                        <li key={index} className={styles.listItem}>
                            <input
                                type="checkbox"
                                checked={checkboxList[index]}
                                // eslint-disable-next-line react/jsx-no-bind
                                onChange={(event): void =>
                                    handleCheckboxChange(event, index)
                                }
                            />
                            <span>{text}</span>
                        </li>
                    ))}
                </ul>
            }
            submitButtonName={'Delete Account'}
            submitButtonVariant={ButtonVariant.DELETE}
            onSubmit={onDelete}
            disabled={checkboxList.includes(false)}
            footerContainerClass={styles.modalFooter}
            buttonsSize={ButtonSize.MEDIUM}
        />
    );
};

export { UserDeleteModal };
