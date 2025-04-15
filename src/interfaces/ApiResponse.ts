export interface ApiResponse<T> {
    success: boolean,
    data: T,
    message?: string,
    status: string,
    error?: string,
}