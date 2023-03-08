const configureString = (...parameters) => {
    const copiedArguments = [...parameters];
    const options = copiedArguments.pop();
    let result = copiedArguments.join('');
    for (const [key, value] of Object.entries(options)) {
        result = result.replace(`:${key}`, value);
    }
    return result;
};
export { configureString };
