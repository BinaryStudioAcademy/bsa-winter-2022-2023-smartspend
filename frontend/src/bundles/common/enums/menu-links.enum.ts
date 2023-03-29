import { type AppRoute } from '~/bundles/auth/enums/enums';

import { type ValueOf } from '../types/types';

const menuLinks = [
    { to: '#app', title: 'Mobile app' },
    { to: '#about', title: 'About' },
    { to: '#analytics', title: 'Analytics' },
    { to: '#budget', title: 'Smart budget' },
    { to: '#reviews', title: 'Reviews' },
    { to: '#subscription', title: 'Subscription' },
] as unknown as {
    to: ValueOf<typeof AppRoute>;
    title: string;
}[];

export { menuLinks };
