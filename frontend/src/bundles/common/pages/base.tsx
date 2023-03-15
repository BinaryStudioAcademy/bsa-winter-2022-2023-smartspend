import React from 'react';

import { Modal } from '~/bundles/common/components/components';
import { useCallback, useState } from '~/bundles/common/hooks/hooks';

const Base: React.FC = () => {
    const [active, setActive] = useState(false);

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);
    const handleModal = useCallback(() => {
        setActive(true);
    }, []);

    return (
        <div>
            Base Page
            <div>
                <button onClick={handleModal}>Open modal window</button>
                <Modal
                    isShown={active}
                    onClose={handleCancel}
                    onSubmit={handleCancel}
                    Header={<h1>Simple Modal</h1>}
                    Body={<p>Simple modal</p>}
                    submitButtonName={'Save changes'}
                >
                    <button>Any button</button>
                </Modal>
            </div>
        </div>
    );
};

export { Base };
