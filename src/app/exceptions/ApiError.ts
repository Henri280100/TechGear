export class ApiError extends Error {
    constructor(public status: string, public message: string) {
        super(message);
        this.name = "ApiError";
    }
}