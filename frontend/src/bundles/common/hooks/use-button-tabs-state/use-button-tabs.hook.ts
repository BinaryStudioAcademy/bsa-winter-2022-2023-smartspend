import { resetTabsActive } from '../../helpers/helpers';
import { type ButtonTab } from '../../types/types';
import { useState } from '../hooks';

type ReturnType = [ButtonTab[], (index: number) => void];

const useButtonTabsState = (defaultData: ButtonTab[]): ReturnType => {
    const [initialState, setInitialState] = useState(defaultData);
    const buttonStateDispatcher = (index: number): void => {
        const resetedTabs = resetTabsActive(initialState);
        resetedTabs[index].isActive = true;
        setInitialState(resetedTabs);
    };
    return [initialState, buttonStateDispatcher];
};

export { useButtonTabsState };
