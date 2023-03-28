import { type AppRoute } from '~/bundles/auth/enums/enums';
import { Link } from '~/bundles/common/components/components.js';

import { type ValueOf } from '../../types/types';

type Properties = {
    links: {
        to: ValueOf<typeof AppRoute>;
        title: string;
    }[];
    classNameList?: string;
    classNameLink: string;
};

const MenuLinks: React.FC<Properties> = ({
    links,
    classNameList,
    classNameLink,
}) => {
    return (
        <ul className={classNameList}>
            {links.map((link, index) => (
                <li key={index}>
                    <Link className={classNameLink} to={link.to}>
                        {link.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export { MenuLinks };
