/* eslint-disable @typescript-eslint/quotes */
import classNames from 'classnames';

import {
    StepInfoPanel,
    WalletCard,
} from '~/bundles/landing/components/components.js';
import {
    StepInfoPanelVariant,
    WalletCardVariant,
} from '~/bundles/landing/enums/enums.js';

import styles from './styles.module.scss';

const FirstStepPart: React.FC = () => {
    const listItems = [
        'Record your cash expenses manually and categorize them.',
        "Set budgets and get alerts when you're close to overspending.",
        'Analyze your spending habits with customizable reports and graphs.',
    ];

    const CashWallets = 'Cash Wallet';
    const FamilyWallet = 'Family Wallet';
    const Account = 'Account';
    const SavingAccount = 'Saving Account';

    const walletCardsArray = [
        {
            title: CashWallets,
            wallet_type: 'Balance',
            balance_value: 900,
            variant: WalletCardVariant.PRIMARY,
            currency: '$',
        },
        {
            title: SavingAccount,
            wallet_type: 'Balance',
            balance_value: 550,
            variant: WalletCardVariant.SECONDARY,
            currency: '€',
        },
        {
            title: Account,
            wallet_type: 'Balance',
            balance_value: 2000,
            variant: WalletCardVariant.TERTIARY,
            currency: '¥',
        },
        {
            title: FamilyWallet,
            wallet_type: 'Balance',
            balance_value: 4500,
            variant: WalletCardVariant.QUATERNARY,
            currency: '$',
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
                            currency={card.currency}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export { FirstStepPart };
