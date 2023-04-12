import { InputType } from '~/bundles/ui/enums/enums';

interface Properties {
    ref: React.RefObject<HTMLInputElement>;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    accept: string;
}

const FileInput: React.FC<Properties> = ({ ref, handleFileChange, accept }) => {
    return (
        <input
            type={InputType.FILE}
            accept={accept}
            ref={ref}
            hidden
            onChange={handleFileChange}
        />
    );
};

export { FileInput };
