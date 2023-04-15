const toCustomLocaleString = (
    number_: number,
    currency = '$',
    space = false,
): string => {
    // eslint-disable-next-line unicorn/no-nested-ternary
    const sign = number_ > 0 ? '+' : number_ < 0 ? '-' : '';
    const absNumber = Math.abs(number_);
    return (
        sign +
        absNumber.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }) +
        (space ? ' ' : '') +
        currency
    );
};

export { toCustomLocaleString };
