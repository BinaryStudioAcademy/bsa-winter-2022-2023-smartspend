import { Button } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/button-type.enum';
import { ButtonVariant } from '~/bundles/common/enums/button-variant.enum';

type Properties = {
    deleteFile: () => void;
};

const DeleteAvatarButton: React.FC<Properties> = ({ deleteFile }) => {
    return (
        <Button
            variant={ButtonVariant.DELETE}
            type={ButtonType.BUTTON}
            onClick={deleteFile}
        >
            Delete Avatar
        </Button>
    );
};

export { DeleteAvatarButton };
