import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';

import { type BudgetCreateRequestDto } from '~/bundles/budgets/budgets';
import { actions as budgetsActions } from '~/bundles/budgets/store';
import { type BudgetSliceResponseDto } from '~/bundles/budgets/types/types.js';
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

type categoryType = {
    id: string;
    name: string;
    icon: string;
    color: string;
    type: string;
};

interface BudgetModalProperties {
    isEdit?: boolean;
    isShown: boolean;
    onClose: () => void;
    onClick?: () => void;
    budget?: BudgetSliceResponseDto;
}

const BudgetModal = ({
    isEdit = false,
    isShown,
    onClose,
    onClick,
    budget,
}: BudgetModalProperties): JSX.Element => {
    const dispatch = useAppDispatch();
    const { control, errors, handleSubmit, trigger, watch, reset } = useAppForm(
        {
            defaultValues: budget as unknown as BudgetCreateRequestDto,
        },
    );
    const isReset = reset;

    const watchCreateFielsd = [
        Boolean(watch('name')),
        Boolean(watch('amount')),
        Boolean(watch('currency')),
        Boolean(watch('recurrence')),
        Boolean(watch('categories')),
        Boolean(watch('startDate')),
    ];

    const categoriesId = budget?.categories.map((it) => it.id);
    const watchCategoryId = (watch('categories') as unknown as categoryType[])
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        ?.map((it) => it.id);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const checkChangeCategory = watchCategoryId?.every((it) =>
        categoriesId?.includes(it),
    );

    const watchEditFielsd = [
        watch('name') === budget?.name ? false : true,
        watch('amount') === budget?.amount ? false : true,
        watch('currency') === budget?.currency ? false : true,
        watch('recurrence') === budget?.recurrence ? false : true,
        checkChangeCategory ? false : true,
        watch('startDate') === budget?.startDate ? false : true,
    ];

    const handleBudgetSubmit = useCallback(
        (formData: BudgetCreateRequestDto): void => {
            if (isEdit) {
                void dispatch(
                    budgetsActions.update({
                        id: budget?.id as string,
                        payload: formData,
                    }),
                );
            } else {
                void dispatch(budgetsActions.create(formData));
            }
            isReset && reset();
        },
        [budget?.id, dispatch, isEdit, isReset, reset],
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
            disabled={
                isEdit
                    ? !watchEditFielsd.some(Boolean)
                    : !watchCreateFielsd.every(Boolean)
            }
        >
            {isEdit && (
                <Button
                    variant={ButtonVariant.DELETE}
                    size={ButtonSize.SMALL}
                    onClick={onClick}
                >
                    Delete budget
                </Button>
            )}
        </BaseModal>
    );
};

export { BudgetModal };
