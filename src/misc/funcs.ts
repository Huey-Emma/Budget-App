export const currencyFormatter = Intl.NumberFormat(undefined, {
    currency: 'EUR',
    style: 'currency',
});

export const genRandomString = (len?: number) => {
    const chars =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    if (!len) {
        len = Math.floor(Math.random() * chars.length);
    }

    let randomString = '';

    for (let i = 0; i < len; i++) {
        randomString += chars[Math.floor(Math.random() * chars.length)];
    }

    return randomString;
};

export const calculatePercentage = (amount: number, totalBudget: number) =>
    (amount / totalBudget) * 100;
