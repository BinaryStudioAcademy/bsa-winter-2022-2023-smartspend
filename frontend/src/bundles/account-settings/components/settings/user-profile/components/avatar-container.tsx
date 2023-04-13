import { useState } from 'react';
import { type Control, Controller } from 'react-hook-form';
import { type UserUpdateRequestDto } from 'shared/build';

import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from '../../styles.module.scss';
import {
    Avatar,
    DeleteAvatarButton,
    UploadAvatarButton,
} from './components.js';

type Properties = {
    control: Control<UserUpdateRequestDto, null>;
};

const AvatarContainer: React.FC<Properties> = ({ control }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const file = event.target.files?.[0];
            setSelectedFile(file ?? null);
        },
        [],
    );

    const deleteFile = useCallback((): void => setSelectedFile(null), []);

    return (
        <div className={styles.avatarContainer}>
            <div className={styles.avatarContent}>
                <Controller
                    name="avatar"
                    control={control}
                    // eslint-disable-next-line react/jsx-no-bind
                    render={({ field }): JSX.Element => (
                        <Avatar
                            selectedFile={selectedFile}
                            handleFileChange={field.onChange}
                            {...field}
                        />
                    )}
                />
                <div className={styles.btnContainer}>
                    <UploadAvatarButton handleFileChange={handleFileChange} />
                    {selectedFile && (
                        <DeleteAvatarButton deleteFile={deleteFile} />
                    )}
                </div>
            </div>
        </div>
    );
};

export { AvatarContainer };
