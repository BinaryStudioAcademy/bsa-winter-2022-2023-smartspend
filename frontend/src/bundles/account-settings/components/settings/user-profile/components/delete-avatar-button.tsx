import { Button } from '~/bundles/common/components/components.js';
import {
    ButtonSize,
    ButtonType,
    ButtonVariant,
} from '~/bundles/common/enums/enums.js';

type Properties = {
    deleteFile: () => void;
};

const DeleteAvatarButton: React.FC<Properties> = ({ deleteFile }) => {
    return (
        <Button
            variant={ButtonVariant.DELETE}
            size={ButtonSize.SMALL}
            type={ButtonType.BUTTON}
            onClick={deleteFile}
        >
            Delete Avatar
        </Button>
    );
};

export { DeleteAvatarButton };
