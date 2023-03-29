import { type MenuLinksType } from '~/bundles/common/types/types.js';

const handleScroll = (
    menuLinks: MenuLinksType[],
    setState: React.Dispatch<React.SetStateAction<string | null>>,
): void => {
    let isLastLinkVisible = false;

    const lastLink = menuLinks[menuLinks.length - 1];

    for (const link of menuLinks) {
        const element: HTMLElement | null = document.querySelector(link.to);

        if (element) {
            const elementTop =
                element.getBoundingClientRect().top + window.pageYOffset - 81;

            const isLastLink = link === lastLink;

            const isLastLinkVisibleAtBottom =
                isLastLink &&
                window.innerHeight + window.pageYOffset >=
                    document.body.offsetHeight;

            const isElementVisible =
                isLastLinkVisibleAtBottom || elementTop < window.pageYOffset;

            if (isElementVisible) {
                setState(link.to);
                isLastLinkVisible =
                    link.to === menuLinks[menuLinks.length - 1].to ||
                    isLastLinkVisible;
            }
        }

        if (
            !isLastLinkVisible &&
            window.innerHeight + window.scrollY >= document.body.offsetHeight
        ) {
            setState(menuLinks[menuLinks.length - 1].to);
        }
    }
};

export { handleScroll };
