function findMinMaxAmount<T extends { amount: number }[]>(
    array: T,
): {
    max: number;
    min: number;
} {
    let max = 0;
    let min = 0;

    for (const object of array) {
        if (object.amount > max) {
            max = object.amount;
        }
        if (object.amount < min) {
            min = object.amount;
        }
    }

    return { min, max };
}

export { findMinMaxAmount };
