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
    console.log(dateString, date);

    // Check if date is valid
    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    });
};

export const parseCompactDate = (dateStr: string | undefined) => {
    if (!dateStr) return "";
    // Assuming YYYYMDD format
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, dateStr.length - 2));
    const day = parseInt(dateStr.substring(dateStr.length - 2));

    return new Date(year, month - 1, day); // month is 0-indexed in JS
};
