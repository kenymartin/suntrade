export abstract class ExceptionsManager extends Error {
    constructor(message: string) {
        super(message);
    }

    abstract handleException(): void;
    
    
}