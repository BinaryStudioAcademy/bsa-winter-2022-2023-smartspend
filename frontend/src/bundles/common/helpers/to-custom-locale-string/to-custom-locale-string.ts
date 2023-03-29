const toCustomLocaleString = (number_: number): string => {
    return number_.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
};

export { toCustomLocaleString };
