export const getQuarter = (
    dateString?: string,
    includeYear: boolean = true
): string => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = date.getUTCMonth();
    const quarter = Math.floor(month / 3) + 1;
    return `Q${quarter} ${includeYear ? date.getUTCFullYear() : ""}`;
};

export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return "";
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
};
