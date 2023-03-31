import classNames from 'classnames';

import { StepInfoPanelVariant, WalletCardVariant } from '../../enums/enums';
import { StepInfoPanel, WalletCard } from '../components';
import styles from './styles.module.scss';

const FirstStepPart: React.FC = () => {
    const listItems = [
        'Connect your bank accounts and all your transactions will get automatically imported to SmartSpend.',
        'Connect your crypto wallet and E-Wallet for complete overview of your cash flow.',
        'Add your cash expenses manually.',
    ];

    const CashWallets = 'Cash Wallet';

    const walletCardsArray = [
        {
            title: CashWallets,
            wallet_type: 'Balance',
            balance_value: '+900.00$',
            variant: WalletCardVariant.PRIMARY,
        },
        {
            title: CashWallets,
            wallet_type: 'Balance',
            balance_value: '+900.00$',
            variant: WalletCardVariant.SECONDARY,
        },
        {
            title: CashWallets,
            wallet_type: 'Balance',
            balance_value: '+900.00$',
            variant: WalletCardVariant.TERTIARY,
        },
        {
            title: CashWallets,
            wallet_type: 'Balance',
            balance_value: '+900.00$',
            variant: WalletCardVariant.QUATERNARY,
        },
    ];

    return (
        <section id="about" className={styles.body}>
            <div className={classNames('container', styles.container)}>
                <StepInfoPanel
                    variant={StepInfoPanelVariant.SECONDARY}
                    title={'Track your cash flow'}
                    listItems={listItems}
                    step={1}
                />
                <div className={styles.cardsContainer}>
                    {walletCardsArray.map((card, index) => (
                        <WalletCard
                            key={index}
                            title={card.title}
                            wallet_type={card.wallet_type}
                            balance_value={card.balance_value}
                            variant={card.variant}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { FirstStepPart };
