const gradientColors = [
    'linear-gradient(95.5deg, #284b9f 0%, #102e68 100%)',
    'linear-gradient(96.2deg, #fecc66 -30.03%, #f83062 95.13%)',
    'linear-gradient(96.2deg, #fe66e6 -30.03%, #6933dd 95.13%)',
    'linear-gradient(91.64deg, #fce302 -1.67%, #fe5c01 98.41%)',
    'linear-gradient(95.77deg, #09f2d6 -14.06%, #09e1ff 101.51%)',
    'linear-gradient(95.77deg, #00d7bd -14.06%, #03bfd9 101.51%)',
    'linear-gradient(90deg, #f27a54 0%, #a154f2 186.42%)',
    'linear-gradient(95.77deg, #29ffe5 -14.06%, #06e1ff 101.51%)',
    'linear-gradient(90deg, #f27a54 -21.05%, #a154f2 121.05%)',
    'linear-gradient(95.77deg, #6989fe 100%, #3c64f4 85%)',
];

const getGradientColors = (gradientString: string | undefined): string[] => {
    const colorStrings: string[] = (gradientString ?? gradientColors[Math.floor(Math.random() * 10)])
        .split(',')
        .map((part: string) => part.trim());
    const colors: string[] = [];

    for (let index = 1; index < colorStrings.length; index++) {
        const colorString: string = colorStrings[index];
        if (colorString.startsWith('#')) {
            colors.push(colorString.slice(0, 7));
            if (colors.length === 2) {
                break;
            }
        }
    }

    return colors;
};

export { getGradientColors };
