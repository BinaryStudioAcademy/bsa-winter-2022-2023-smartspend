import { numberToStringCurrencyHelper } from '../../helpers/helpers';
import { type ConfigBar } from '../../types/types';

const options: ConfigBar = {
    scales: {
        y: {
            ticks: {
                callback: (value) => numberToStringCurrencyHelper(value),
                stepSize: 250_000,
            },
        },
    },
    responsive: true,
    parsing: {
        xAxisKey: 'date',
        yAxisKey: 'value',
    },
    layout: {
        padding: 20,
    },
    borderWidth: 1,
    barThickness: 5,
};

export { options };
