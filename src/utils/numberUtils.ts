export const formatNumber = (
    amount: number | undefined,
    symbol?: string
): string => {
    if (amount === undefined || amount === null) {
        return `${symbol ? symbol : ""}0`;
    }

    const absAmount = Math.abs(amount);
    const sign = amount < 0 ? "-" : "";

    if (absAmount < 1000) {
        return `${sign}${symbol ? symbol : ""}${absAmount.toLocaleString(
            "en-US"
        )}`;
    }

    const formatWithSuffix = (value: number, suffix: string): string => {
        const formatted = value.toLocaleString("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 3,
        });
        return `${sign}${symbol ? symbol : ""}${formatted}${suffix}`;
    };

    if (absAmount < 1000000) {
        const thousands = absAmount / 1000;
        return formatWithSuffix(thousands, "K");
    }

    if (absAmount < 1000000000) {
        const millions = absAmount / 1000000;
        return formatWithSuffix(millions, "M");
    }

    if (absAmount < 1000000000000) {
        const billions = absAmount / 1000000000;
        return formatWithSuffix(billions, "B");
    }

    const trillions = absAmount / 1000000000000;
    return formatWithSuffix(trillions, "T");
};
