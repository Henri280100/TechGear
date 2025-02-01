import { ApiError } from "./ApiError";
import ValidationError from "./ValidationError";

export const handleApiError = (error: ApiError | ValidationError | Error): string => {
  if (error instanceof ApiError) {
    return `API Error (${error.status}): ${error.message}`;
  }

  if (error instanceof ValidationError) {
    return `Validation Error on ${error.field}: ${error.message}`;
  }

  // Generic fallback
  return error.message || "An unknown error occurred.";
};
