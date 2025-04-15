export const formatDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0"); // Use UTC to avoid timezone issues
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`; // Consistent format: DD/MM/YYYY
  };