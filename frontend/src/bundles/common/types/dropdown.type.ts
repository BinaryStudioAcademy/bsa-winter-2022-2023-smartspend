import { type IconProp } from '@fortawesome/fontawesome-svg-core';
import {
    type ActionMeta,
    type MultiValue,
    type SingleValue,
} from 'react-select';

interface DataType {
    value: string;
    name?: string;
    image?: string;
    icon?: IconProp | string;
    color?: string;
    type?: string;
    id?: string;
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
