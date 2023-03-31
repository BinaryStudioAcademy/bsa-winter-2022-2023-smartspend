import { useCallback, useState } from '~/bundles/common/hooks/hooks';

import { BaseModal, CodeHighlight } from '../components';

const codeExample = `
const BaseModalExample: React.FC = () => {
    return (
        const [active, setActive] = useState(false);

        const handleCancel = useCallback(() => {
            setActive(false);
        }, []);
        const handleModal = useCallback(() => {
            setActive(true);
        }, []);

        return (
            <div>
            <button onClick={handleModal}>Open modal window</button>
            <BaseModal
                isShown={active}
                onClose={handleCancel}
                onSubmit={handleCancel}
                Header={<h1>Simple Modal</h1>}
                Body={<p>Simple modal</p>}
                submitButtonName={'Save changes'}
            ></BaseModal>
        </div>
    );
}
`;

const BaseModalPart: React.FC = () => {
    const [active, setActive] = useState(false);

    const handleCancel = useCallback(() => {
        setActive(false);
    }, []);
    const handleModal = useCallback(() => {
        setActive(true);
    }, []);

    return (
        <div>
            <CodeHighlight code={codeExample} />
            <button onClick={handleModal}>Open modal window</button>
            <BaseModal
                isShown={active}
                onClose={handleCancel}
                onSubmit={handleCancel}
                Header={<h1>Simple Modal</h1>}
                Body={<p>Simple modal</p>}
                submitButtonName={'Save changes'}
            ></BaseModal>
        </div>
    );
};

export { BaseModalPart };
