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
import { compareObjects } from '~/bundles/common/helpers/helpers';
import {
    useAppDispatch,
    useAppForm,
    useCallback,
} from '~/bundles/common/hooks/hooks';

import { recurrences } from '../../enums/recurrences.enum';
import {
    RenderCurrency,
    RenderDate,
    RenderMultiDropdown,
    RenderRecurrence,
} from '../components';
import styles from './styles.module.scss';

type Properties = {
    isEdit?: boolean;
    isShown: boolean;
    onClose: () => void;
    onClick?: () => void;
    budget?: BudgetSliceResponseDto | undefined;
};

const BudgetModal: React.FC<Properties> = ({
    isEdit = false,
    isShown,
    onClose,
    onClick,
    budget,
}): JSX.Element => {
    const dispatch = useAppDispatch();
    const categoriesId = budget?.categories.map((it) => it.id);

    let budgetData;
    let id: unknown;
    if (budget) {
        ({ id, ...budgetData } = budget);
        budgetData.categories = categoriesId;
    }

    const currentBudget: BudgetCreateRequestDto = budgetData;
    const DEFAULT_VALUES = {
        name: '',
        amount: 0,
        currency: '',
        recurrence: recurrences[4].value,
        startDate: new Date().toISOString(),
        categories: [],
    };

    const { control, errors, handleSubmit, trigger, watch, reset } = useAppForm(
        {
            defaultValues: isEdit ? currentBudget : DEFAULT_VALUES,
        },
    );
    const isReset = reset;

    const createFields =
        Object.values(watch()).every(Boolean) && !!watch('categories')[0];
    const editFields = isEdit && compareObjects(watch(), currentBudget);

    const handleBudgetSubmit = useCallback(
        (formData: BudgetCreateRequestDto): void => {
            if (isEdit) {
                void dispatch(
                    budgetsActions.update({
                        id: id as string,
                        payload: formData,
                    }),
                );
            } else {
                void dispatch(budgetsActions.create(formData));
            }
            isReset && reset();
        },
        [dispatch, id, isEdit, isReset, reset],
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
            Header={
                <p className={styles.header}>
                    {isEdit ? 'Edit Budget' : 'Create new Budget'}
                </p>
            }
            Body={
                <div className={styles.formWrapper}>
                    <div className={styles.wrapperHalf}>
                        <h2>General Info</h2>
                        <Input
                            labelClassName={styles.label}
                            control={control}
                            label={'Budget name'}
                            name={'name'}
                            placeholder={'Enter budget name'}
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
                            placeholder={'0.00'}
                        />
                        <Controller
                            name="currency"
                            control={control}
                            render={RenderCurrency}
                        />
                    </div>
                    <div className={styles.wrapperHalf}>
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
            }
            submitButtonName={isEdit ? 'Save changes' : 'Create'}
            disabled={
                isEdit ? editFields || !watch('categories')[0] : !createFields
            }
            footerContainerClass={styles.modalFooter}
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
