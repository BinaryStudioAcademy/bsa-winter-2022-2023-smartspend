import { BASE_APP_TITLE } from '../../constants/base-app-title.constant';

const getAppTitle = (title?: string): string => {
    if (!title) {
        return BASE_APP_TITLE;
    }
    const appTitlesArray = [title, BASE_APP_TITLE];
    return appTitlesArray.join(' | ');
};

export { getAppTitle };
