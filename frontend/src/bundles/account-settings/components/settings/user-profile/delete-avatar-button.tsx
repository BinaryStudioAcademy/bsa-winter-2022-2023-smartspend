import { Button } from '~/bundles/common/components/components';
import { ButtonType } from '~/bundles/common/enums/button-type.enum';
import { ButtonSize, ButtonVariant } from '~/bundles/common/enums/enums';

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
