import { toast } from 'react-toastify';

import { NotificationType } from '~/bundles/common/enums/enums.js';

const DEFAULT_MESSAGE = 'Unexpected error';

interface Parameters {
    type: NotificationType;
}

class Notification {
    public error(message = DEFAULT_MESSAGE): void {
        this.show(message, {
            type: NotificationType.ERROR,
        });
    }
    public success(message = DEFAULT_MESSAGE): void {
        this.show(message, {
            type: NotificationType.SUCCESS,
        });
    }
    public info(message = DEFAULT_MESSAGE): void {
        this.show(message, {
            type: NotificationType.INFO,
        });
    }
    public warning(message = DEFAULT_MESSAGE): void {
        this.show(message, {
            type: NotificationType.WARNING,
        });
    }
    private show(message: string, parameters: Parameters): void {
        toast(message, parameters);
    }
}

export { Notification };
