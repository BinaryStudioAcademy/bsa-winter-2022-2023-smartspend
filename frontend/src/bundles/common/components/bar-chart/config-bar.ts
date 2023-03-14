const options = {
    scales: {
        y: {
            ticks: {
                callback: (value: {
                    toLocaleString: (
                        argument0: string,
                        argument1: { style: string; currency: string },
                    ) => string;
                }): string =>
                    `+${value
                        .toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                        })
                        .slice(1)} $`,
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
