import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';

import { type BudgetCreateRequestDto } from '~/bundles/budgets/budgets';
import { actions as budgetsActions } from '~/bundles/budgets/store';
import {
    BaseModal,
    Button,
    Input,
} from '~/bundles/common/components/components';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { useAppDispatch, useAppForm } from '~/bundles/common/hooks/hooks';

import {
    RenderCurrency,
    RenderDate,
    RenderMultiDropdown,
    RenderRecurrence,
} from '../components';
import styles from './styles.module.scss';

interface FormData {
    name: string;
    amount: number;
    currency: string;
    recurrence: string;
    categories: {
        id: string;
    }[];
    startDate: string;
}

interface BudgetModalProperties {
    isEdit?: boolean;
    isShown: boolean;
    onClose: () => void;
    budget?: FormData | undefined;
}

const BudgetModal = ({
    isEdit = false,
    isShown,
    onClose,
    budget,
}: BudgetModalProperties): JSX.Element => {
    const dispatch = useAppDispatch();
    const { control, errors, handleSubmit, trigger } = useAppForm({
        defaultValues: budget ?? {
            name: '',
            amount: 0,
            currency: '',
            recurrence: '',
            categories: [{ id: '' }],
            startDate: '',
        },
    });

    const handleBudgetSubmit = useCallback(
        (formData: FormData): void => {
            void dispatch(
                budgetsActions.create(
                    formData as unknown as BudgetCreateRequestDto,
                ),
            );
        },
        [dispatch],
    );

    const handleFormSubmit = useCallback(
        (event: React.BaseSyntheticEvent): void => {
            event.preventDefault();
            void trigger();
            void handleSubmit(handleBudgetSubmit)(event);
            onClose();
        },
        [trigger, handleSubmit, handleBudgetSubmit, onClose],
    );

    return (
        <BaseModal
            isShown={isShown}
            onClose={onClose}
            onSubmit={handleFormSubmit as () => void}
            Header={<h1>{isEdit ? 'Edit Budget' : 'Create budget'}</h1>}
            Body={
                <>
                    <div className={styles.formWrapper}>
                        <div>
                            <h2>General Info</h2>
                            <Input
                                labelClassName={styles.label}
                                control={control}
                                label={'Budget name'}
                                name={'name'}
                                placeholder={'Budget name'}
                                errors={errors}
                            />
                        </div>
                        <div className={styles.sumRow}>
                            <Input
                                labelClassName={styles.label}
                                control={control}
                                errors={errors}
                                label={'Amount'}
                                name={'amount'}
                                placeholder={'Amount'}
                            />
                            <Controller
                                name="currency"
                                control={control}
                                render={RenderCurrency}
                            />
                        </div>
                        <div>
                            <h2>Filters</h2>
                            <Controller
                                name="categories"
                                control={control}
                                render={RenderMultiDropdown}
                            />
                        </div>
                        <div>
                            <h2>Budget Period</h2>
                            <span className={styles.label}>Recurrence</span>
                            <Controller
                                name="recurrence"
                                control={control}
                                render={RenderRecurrence}
                            />
                            <span className={styles.label}>Start date</span>
                            <Controller
                                name="startDate"
                                control={control}
                                render={RenderDate}
                            />
                        </div>
                    </div>
                </>
            }
            submitButtonName={isEdit ? 'Save changes' : 'Create'}
        >
            {isEdit && (
                <Button variant={ButtonVariant.DELETE} size={ButtonSize.SMALL}>
                    Delete budget
                </Button>
            )}
        </BaseModal>
    );
};

export { BudgetModal };
