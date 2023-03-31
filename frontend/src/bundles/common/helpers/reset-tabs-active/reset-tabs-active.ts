import { type ButtonTab } from '../../types/button-tabs.type';

const resetTabsActive = (tabsArray: ButtonTab[]): ButtonTab[] => {
    const tabsCopy = [...tabsArray];
    for (const tab of tabsCopy) {
        tab.isActive = false;
    }
    return tabsCopy;
};

export { resetTabsActive };
