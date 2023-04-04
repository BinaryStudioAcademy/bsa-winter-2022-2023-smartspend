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

type HandleMultiChange = (
    newValue: SingleValue<DataType> | MultiValue<DataType>,
    actionMeta: ActionMeta<DataType>,
) => void;

type HandleSingleChange = (
    newValue: SingleValue<DataType>,
    actionMeta: ActionMeta<DataType>,
) => void;

export { type DataType, type HandleMultiChange, type HandleSingleChange };
