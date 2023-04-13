import { type AppDocumentTitles } from '../../enums/app-document-titles.enum';
import { getAppTitle } from '../../helpers/helpers';
import { useEffect, useRef as useReference } from '../hooks';

const useAppDocumentTitle = (
    title?: AppDocumentTitles,
    prevailOnUnmount = false,
): void => {
    const defaultTitle = useReference(document.title);

    const appTitle = getAppTitle(title);

    useEffect(() => {
        document.title = appTitle;
    }, [appTitle, title]);

    useEffect(
        () => (): void => {
            if (!prevailOnUnmount) {
                document.title = defaultTitle.current;
            }
        },
        [defaultTitle, prevailOnUnmount],
    );
};

export { useAppDocumentTitle };
