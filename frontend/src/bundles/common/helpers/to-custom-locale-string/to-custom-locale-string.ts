const toCustomLocaleString = (number_: number, currency = '$'): string => {
    const sign = number_ >= 0 ? '+' : '-';
    const absNumber = Math.abs(number_);
    return (
        sign +
        absNumber.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }) +
        currency
    );
};

export { toCustomLocaleString };
