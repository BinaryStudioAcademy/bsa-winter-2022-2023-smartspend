import { AppRoute } from '../../enums/enums.js';

const getText = (pathname: string, type: string): string => {
    type Properties = Record<string, string>;

    const titles: Properties = {
        [AppRoute.SIGN_IN]: 'Log In',
        [AppRoute.SIGN_UP]: 'Sign Up',
    };

    const authText: Properties = {
        [AppRoute.SIGN_IN]: 'No account?',
        [AppRoute.SIGN_UP]: 'Have an account?',
    };

    const authLink: Properties = {
        [AppRoute.SIGN_IN]: 'Sign Up',
        [AppRoute.SIGN_UP]: 'Log In',
    };

    const footers: Properties = {
        [AppRoute.SIGN_IN]: 'Or Log In with',
        [AppRoute.SIGN_UP]: 'Or Sign Up with',
    };

    switch (type) {
        case 'title': {
            return titles[pathname] || '';
        }
        case 'authText': {
            return authText[pathname] || '';
        }
        case 'authLink': {
            return authLink[pathname] || '';
        }
        case 'footers': {
            return footers[pathname] || '';
        }
        default: {
            return '';
        }
    }
};

export { getText };
