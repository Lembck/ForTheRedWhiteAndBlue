export const formatNumber = (amount: number | undefined): string => {
    if (amount === undefined || amount === null) {
        return "0";
    }

    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? "-" : "";

    // Less than 1000 - show as whole dollars
    if (absAmount < 1000) {
        return `${sign}${absAmount.toLocaleString("en-US")}`;
    }

    // Helper function to format with commas and 1 decimal place
    const formatWithSuffix = (value: number, suffix: string): string => {
        const rounded = Math.round(value * 10) / 10; // Round to 1 decimal place
        const formatted = rounded.toLocaleString("en-US", {
            minimumFractionDigits: rounded % 1 === 0 ? 0 : 1,
            maximumFractionDigits: 1,
        });
        return `${sign}${formatted}${suffix}`;
    };

    // Thousands (1K - 999.9K)
    if (absAmount < 1000000) {
        const thousands = absAmount / 1000;
        return formatWithSuffix(thousands, "K");
    }

    // Millions (1M - 999.9M)
    if (absAmount < 1000000000) {
        const millions = absAmount / 1000000;
        return formatWithSuffix(millions, "M");
    }

    // Billions (1B - 999.9B)
    if (absAmount < 1000000000000) {
        const billions = absAmount / 1000000000;
        return formatWithSuffix(billions, "B");
    }

    // Trillions (1T+)
    const trillions = absAmount / 1000000000000;
    return formatWithSuffix(trillions, "T");
};
