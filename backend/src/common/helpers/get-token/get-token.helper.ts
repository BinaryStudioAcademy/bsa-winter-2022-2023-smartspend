const getToken = (authorization: string): string => {
    const [, token] = authorization.split(' ');
    return token;
};

export { getToken };
