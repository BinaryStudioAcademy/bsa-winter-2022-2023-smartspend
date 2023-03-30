const Loader = (): React.ReactElement | null => {
    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <h1>Loading...</h1>
        </div>
    );
};

export { Loader };
