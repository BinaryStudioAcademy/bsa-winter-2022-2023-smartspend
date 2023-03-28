import { type ValueOf } from '../types/types.js';
import { type AppRoute } from './enums.js';

const menuLinks = [
    { to: '/ui', title: 'Pricing' },
    { to: '/banks', title: 'Bank connect' },
    { to: '/help', title: 'Help' },
    { to: '/about', title: 'About us' },
    { to: '/blog', title: 'Blog' },
    { to: '/contact', title: 'Contact' },
] as {
    to: ValueOf<typeof AppRoute>;
    title: string;
}[];

export { menuLinks };
