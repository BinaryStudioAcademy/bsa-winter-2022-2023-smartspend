import {
    type ActionMeta,
    type MultiValue,
    type SingleValue,
} from 'react-select';

interface DataType {
    value: string;
    name?: string;
    image?: string;
}

type HandleChangeFunction = (
    newValue: SingleValue<DataType> | MultiValue<DataType>,
    actionMeta: ActionMeta<DataType>,
) => void;

export { type DataType, type HandleChangeFunction };
