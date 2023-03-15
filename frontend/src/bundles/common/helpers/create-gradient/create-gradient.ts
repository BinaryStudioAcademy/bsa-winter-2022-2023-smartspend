import { type Color, type ScriptableContext } from 'chart.js';

const createGradientItem = (
    cxt: CanvasRenderingContext2D,
    colorArray: string[],
): CanvasGradient => {
    const value = cxt.createLinearGradient(0, 0, 100, 0);

    value.addColorStop(0, colorArray[0]);
    value.addColorStop(1, colorArray[1]);

    return value;
};

const createGradients = (
    context: ScriptableContext<'doughnut'>,
    colors: string[][],
): Color => {
    const context_ = context.chart.ctx;
    return colors.map((color) =>
        createGradientItem(context_, color),
    ) as unknown as Color;
};

export { createGradients };
