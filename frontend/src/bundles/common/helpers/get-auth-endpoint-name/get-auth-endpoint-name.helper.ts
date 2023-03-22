const getAuthEndpointName = (path: string): string => {
    return path.replace(/\//gi, '');
};

export { getAuthEndpointName };
