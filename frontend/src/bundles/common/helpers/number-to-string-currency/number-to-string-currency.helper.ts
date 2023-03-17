interface NumberToStringCurrencyHelper {
    toLocaleString: (
        locales: Intl.LocalesArgument,
        options: Intl.NumberFormatOptions,
    ) => string;
}

const DEFAULT_OPTIONS: Intl.NumberFormatOptions = {
    style: 'currency',
    currency: 'USD',
};

const numberToStringCurrencyHelper = (
    value: NumberToStringCurrencyHelper,
    options = DEFAULT_OPTIONS,
): string => `+${value.toLocaleString('en-US', options).slice(1)} $`;

export { numberToStringCurrencyHelper };
