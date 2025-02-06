export type ApiResponse<T> = {
    success: boolean,
    data: T,
    message?: string,
    status: string,
    error?: string,
}