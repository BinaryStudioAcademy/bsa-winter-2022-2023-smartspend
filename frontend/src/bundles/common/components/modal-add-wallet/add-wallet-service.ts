interface WalletData {
    walletName: string;
    currency: string;
}

const addWalletService = {
    add: async (walletData: WalletData): Promise<WalletData> => {
        const { walletName, currency } = walletData;
        const body = JSON.stringify({
            walletName,
            currency,
        });

        return fetch('url - endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: body,
        }).then((response) => response.json());
    },
};

export { addWalletService };
