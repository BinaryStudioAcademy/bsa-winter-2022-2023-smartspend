import { useState } from 'react';

import { useCallback } from '~/bundles/common/hooks/hooks';

import styles from '../styles.module.scss';
import { Avatar } from './avatar';
import { DeleteAvatarButton } from './delete-avatar-button';
import { UploadAvatarButton } from './upload-avatar-button';

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
            <div className={styles.avatarContent}>
                <Avatar selectedFile={selectedFile} />
                <div className={styles.btnContainer}>
                    <UploadAvatarButton handleFileChange={handleFileChange} />
                    <DeleteAvatarButton deleteFile={deleteFIle} />
                </div>
            </div>
        </div>
    );
};

export { AvatarContainer };