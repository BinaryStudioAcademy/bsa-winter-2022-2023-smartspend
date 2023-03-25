import { useState } from 'react';

import { Avatar } from '~/bundles/common/components/settings/user-profile/avatar';
import { DeleteAvatarButton } from '~/bundles/common/components/settings/user-profile/delete-avatar-button';
import { UploadAvatarButton } from '~/bundles/common/components/settings/user-profile/upload-avatar-button';
import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from '../styles.module.scss';

const AvatarContainer: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const file = event.target.files?.[0];
            setSelectedFile(file ?? null);
        },
        [],
    );

    const deleteFIle = useCallback((): void => setSelectedFile(null), []);

    return (
        <div className={styles.avatarContainer}>
            <span className={styles.label}>Profile photo</span>

            <div className={styles.avatarContent}>
                <Avatar selectedFile={selectedFile} />
                <UploadAvatarButton handleFileChange={handleFileChange} />

                <DeleteAvatarButton deleteFile={deleteFIle} />
            </div>
        </div>
    );
};

export { AvatarContainer };
