// /* eslint-disable */
import React from 'react';

import { Input } from '~/bundles/common/components/components';
import { useAppForm } from '~/bundles/common/hooks/hooks';

const DEFAULT_INPUT_FILTER: { note: string } = {
    note: '',
};

const CreateInput: React.FC = () => {
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
        />
    );
};

export { CreateInput };
