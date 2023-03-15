// /* eslint-disable */
import React from 'react';

import { Input } from '~/bundles/common/components/components';
import { useAppForm } from '~/bundles/common/hooks/hooks';

import styles from './styles.module.scss';

const DEFAULT_INPUT_FILTER: { note: string } = {
    note: '',
};

const CreateInputNote: React.FC = () => {
    const { control, errors } = useAppForm<{ note: string }>({
        defaultValues: DEFAULT_INPUT_FILTER,
    });

    return (
        <Input
            type="text"
            label="By note"
            placeholder="Filter by specific keyword"
            name="note"
            control={control}
            errors={errors}
            className={styles.input}
        />
    );
};

export { CreateInputNote };
