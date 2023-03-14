import './tabs.css';

import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface TabProperties {
    title: string;
    to: string;
}

const Tab: React.FC<TabProperties> = ({ title, to }) => {
    const resolvedPath = useResolvedPath(to);
    const isActive = useMatch({ path: resolvedPath.pathname, end: true });

    return (
        <li>
            <button className={`tab ${isActive ? 'active' : ''}`}>
                <Link to={to}>{title}</Link>
            </button>
        </li>
    );
};

const Tabs: React.FC = () => {
    return (
        <nav>
            <ul className="tabs">
                {[
                    { title: 'Transaction', to: '/' },
                    { title: 'Overview', to: '/overview' },
                    { title: 'Budget', to: '/budget' },
                    { title: 'Wallet Settings', to: '/wallet-settings' },
                ].map((item, index) => (
                    <Tab key={index} title={item.title} to={item.to} />
                ))}
            </ul>
        </nav>
    );
};

export { Tabs };
