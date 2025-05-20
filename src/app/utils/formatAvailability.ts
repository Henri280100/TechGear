export const formatAvailability = (availability: string) => {
    if (!availability) return "N/A";

    // Replace underscores with spaces and convert to title case
    return availability
        .replace(/_/g, " ") // Replace all underscores with spaces
        .toLowerCase() // Convert to lowercase
        .replace(/(^|\s)\w/g, char => char.toUpperCase()); // Capitalize first letter of each word
}