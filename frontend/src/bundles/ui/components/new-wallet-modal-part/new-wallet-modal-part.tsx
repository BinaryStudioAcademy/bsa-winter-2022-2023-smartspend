import { useCallback, useState } from '~/bundles/common/hooks/hooks.js';

import { CodeHighlight, NewWalletModal } from '../components.js';

const codeExample = `
const NewWalletModalPart: React.FC = () => {
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
            <button onClick={handleModal}>Add New Wallet</button>
            <NewWalletModal
                isShown={active}
                onClose={handleCancel}
                onSubmit={handleModal}
            />
        </div>
    );
};
`;

const NewWalletModalPart: React.FC = () => {
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
            <button onClick={handleModal}>Add New Wallet</button>
            <NewWalletModal
                isShown={active}
                onClose={handleCancel}
                onSubmit={handleModal}
            />
        </div>
    );
};

export { NewWalletModalPart };
