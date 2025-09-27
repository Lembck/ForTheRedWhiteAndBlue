import { GDPChangeData, GDPObservation } from "@/types/gdp";

export const formatGDPValue = (value?: string): string => {
    if (!value) return "";
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;

    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }).format(numValue);
};

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

export const calculateChange = (
    fromData: GDPObservation | null,
    toData: GDPObservation | null
): GDPChangeData | null => {
    if (!fromData?.value || !toData?.value) return null;

    const currentValue = parseFloat(fromData.value);
    const previousValue = parseFloat(toData.value);

    if (isNaN(currentValue) || isNaN(previousValue)) return null;

    const change = currentValue - previousValue;
    const percentChange = (change / previousValue) * 100;

    return {
        absolute: change,
        percent: percentChange,
        isPositive: change >= 0,
        dateString: toData.date,
    };
};
