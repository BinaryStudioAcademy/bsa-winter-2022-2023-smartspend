import { icons } from '../pages/categories-settings/common/icons-list';

const findIcon = (iconKey: string): JSX.Element | undefined => {
    return icons[iconKey];
};

export { findIcon };
