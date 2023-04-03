import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';

import {
    BaseModal,
    Button,
    Input,
} from '~/bundles/common/components/components';
import { ButtonSize } from '~/bundles/common/enums/button-size.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';
import { useAppForm } from '~/bundles/common/hooks/hooks';

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
        value: string;
        name?: string;
        image?: string;
    }[];
    startDate: string;
}

interface EditBudgetModalProperties {
    isShown: boolean;
    onClose: () => void;
    budget: FormData;
}

const EditBudgetModal = ({
    isShown,
    onClose,
    budget,
}: EditBudgetModalProperties): JSX.Element => {
    const { control, errors, handleSubmit, trigger } = useAppForm({
        defaultValues: budget,
    });

    const handleUpdateBudgetSubmit = useCallback((formData: FormData): void => {
        // eslint-disable-next-line no-console
        console.log(formData);
    }, []);

    const handleFormSubmit = useCallback(
        (event: React.BaseSyntheticEvent): void => {
            event.preventDefault();
            void trigger();
            void handleSubmit(handleUpdateBudgetSubmit)(event);
        },
        [handleSubmit, handleUpdateBudgetSubmit, trigger],
    );

    return (
        <BaseModal
            width={600}
            isShown={isShown}
            onClose={onClose}
            onSubmit={handleFormSubmit as () => void}
            Header={<h1>Edit Budget</h1>}
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
            submitButtonName={'Save changes'}
        >
            <Button variant={ButtonVariant.DELETE} size={ButtonSize.SMALL}>
                Delete budget
            </Button>
        </BaseModal>
    );
};

export { EditBudgetModal };
