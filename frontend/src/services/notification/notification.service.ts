import { toast } from 'react-toastify';

import { NotificationType } from '~/bundles/common/enums/notification-type.enum';

const DEFAULT_MESSAGE = 'Unexpected error';

class Notification {
    public [NotificationType.ERROR](message = DEFAULT_MESSAGE): void {
        toast.error(message);
    }

    public [NotificationType.SUCCESS](message = DEFAULT_MESSAGE): void {
        toast.success(message);
    }

    public [NotificationType.WARNING](message = DEFAULT_MESSAGE): void {
        toast.warn(message);
    }

    public [NotificationType.INFO](message = DEFAULT_MESSAGE): void {
        toast.info(message);
    }
}

const notification = new Notification();

export { notification };
