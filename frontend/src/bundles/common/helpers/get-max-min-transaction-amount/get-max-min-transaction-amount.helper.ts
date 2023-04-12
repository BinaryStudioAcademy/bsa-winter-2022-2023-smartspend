function findMinMaxAmount<T extends { amount: number }[]>(
    array: T,
): {
    max: number;
    min: number;
} {
    if (!Array.isArray(array) || array.length === 0) {
        return { min: -1000, max: 1_000_000 };
    }

    let max = array[0].amount;
    let min = array[0].amount;

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
