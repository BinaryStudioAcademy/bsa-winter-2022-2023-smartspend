const sumArray = (numbers: number[]): number => {
    let sum = 0;
    for (const number_ of numbers) {
        sum += number_;
    }
    return sum;
};

export { sumArray };
