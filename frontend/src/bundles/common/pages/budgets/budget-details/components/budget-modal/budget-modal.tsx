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
    useAppSelector,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from '~/bundles/common/hooks/hooks';

import { recurrences } from '../../enums/recurrences.enum';
import {
    RenderEndDate,
    RenderMultiDropdown,
    RenderRecurrence,
    RenderStartDate,
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
    const [show, setShow] = useState(true);

    const { user } = useAppSelector((state) => state.users);

    let budgetData;
    let id: unknown;
    if (budget) {
        ({ id, ...budgetData } = budget);
        budgetData.categories = categoriesId;
    }

    const currentBudget: BudgetCreateRequestDto = budgetData;
    const DEFAULT_VALUES = useMemo(
        () => ({
            name: '',
            amount: 0,
            currency: user?.currency as string,
            recurrence: recurrences[4].value,
            startDate: new Date().toISOString(),
            categories: [],
        }),
        [user?.currency],
    );

    const { control, errors, handleSubmit, trigger, watch, reset } = useAppForm(
        {
            defaultValues: isEdit ? currentBudget : DEFAULT_VALUES,
        },
    );
    const isReset = reset;

    const createFields =
        (Object.values(watch()).every(Boolean) && !!watch('categories')[0]) ||
        watch('endDate');
    const editFields = isEdit && compareObjects(watch(), currentBudget);
    const handleBudgetSubmit = useCallback(
        (formData: BudgetCreateRequestDto): void => {
            formData.currency = user?.currency as string;
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
        [dispatch, id, isEdit, isReset, reset, user?.currency],
    );

    useEffect(() => {
        if (
            control._formValues.endDate &&
            reset &&
            control._formValues.recurrence !== recurrences[0].value
        ) {
            reset({ ...control._formValues, endDate: undefined });
            setShow(false);
        }
    }, [
        DEFAULT_VALUES,
        control._formValues,
        control._formValues.endDate,
        control._formValues.recurrence,
        reset,
    ]);

    const handleFormSubmit = useCallback(
        (event: React.BaseSyntheticEvent): void => {
            event.preventDefault();
            void trigger();
            void handleSubmit(handleBudgetSubmit)(event);
            onClose();
        },
        [trigger, handleSubmit, handleBudgetSubmit, onClose],
    );
    const startDateIso = new Date(control._formValues.startDate);
    const endDateIso = new Date(control._formValues.endDate);

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
                    <p className={styles.title}>General Info</p>
                    <div className={styles.wrapperHalf}>
                        <Input
                            labelClassName={styles.label}
                            control={control}
                            label={'Budget name'}
                            name={'name'}
                            placeholder={'Enter budget name'}
                            errors={errors}
                        />
                        <Input
                            labelClassName={styles.label}
                            control={control}
                            errors={errors}
                            label={'Amount'}
                            name={'amount'}
                            placeholder={'0.00'}
                        />
                    </div>
                    {/*maybe it will be used in the future}*/}
                    {/*<Controller*/}
                    {/*    name="currency"*/}
                    {/*    control={control}*/}
                    {/*    render={RenderCurrency}*/}
                    {/*/>*/}
                    <p className={styles.title}>Filters</p>
                    <div className={styles.wrapperHalf}>
                        <Controller
                            name="categories"
                            control={control}
                            render={RenderMultiDropdown}
                        />
                    </div>
                    <div>
                        <p className={styles.title}>Budget Period</p>
                        <span className={styles.label}>Recurrence</span>
                        <Controller
                            name="recurrence"
                            control={control}
                            render={RenderRecurrence}
                        />
                        <div className={styles.dates}>
                            <div className={styles.startDate}>
                                <span className={styles.label}>Start date</span>
                                <Controller
                                    name="startDate"
                                    control={control}
                                    render={RenderStartDate}
                                />
                            </div>
                            {control._formValues.recurrence ===
                                recurrences[0].value && (
                                <div>
                                    <span className={styles.label}>
                                        End date
                                    </span>
                                    <RenderEndDate
                                        name="endDate"
                                        control={control}
                                        error={errors}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            }
            submitButtonName={isEdit ? 'Save changes' : 'Create'}
            disabled={
                ((isEdit
                    ? editFields || !watch('categories')[0] || !watch('endDate')
                    : !createFields) &&
                    show) ||
                (control._formValues.recurrence === recurrences[0].value &&
                    endDateIso < startDateIso)
            }
            footerContainerClass={styles.modalFooter}
        >
            {isEdit && (
                <Button
                    variant={ButtonVariant.DELETE}
                    size={ButtonSize.SMALL}
                    onClick={onClick}
                    className={styles.delete}
                >
                    Delete budget
                </Button>
            )}
        </BaseModal>
    );
};

export { BudgetModal };
