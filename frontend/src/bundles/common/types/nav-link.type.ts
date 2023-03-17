import { type AppRoute } from '../enums/app-route.enum';
import { type ValueOf } from './types';

type LinkProperties = {
    to: ValueOf<typeof AppRoute>;
    value: string;
};

export { type LinkProperties };
