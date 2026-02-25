// Updated MiniKit error handling

class MiniKitError extends Error {
    constructor(message) {
        super(message);
        this.name = 'MiniKitError';
    }
}

function safeExecute(func) {
    try {
        func();
    } catch (error) {
        throw new MiniKitError(`Error executing function: ${error.message}`);
    }
}

export { safeExecute, MiniKitError };