function compareObjects<T extends object>(
    object1: T | undefined,
    object2: T | undefined,
): boolean {
    if (!object1 || !object2) {
        return false;
    }

    if (Object.keys(object1).length !== Object.keys(object2).length) {
        return false;
    }

    for (const key in object1) {
        if (
            Object.prototype.hasOwnProperty.call(object1, key) &&
            String(object1[key]) !== String(object2[key])
        ) {
            return false;
        }
    }

    return true;
}

export { compareObjects };
