import { BASE_APP_TITLE } from '../../constants/base-app-title.constant';

const getAppTitle = (title?: string): string => {
    const appTitlesArray = [title, BASE_APP_TITLE];
    return appTitlesArray.join(' | ');
};

export { getAppTitle };
