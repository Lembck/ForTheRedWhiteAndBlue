import { GDPChangeData, GDPObservation } from "@/types/gdp";

export const calculateChange = (
    fromData: GDPObservation | null,
    toData: GDPObservation | null
): GDPChangeData | null => {
    if (!fromData?.value || !toData?.value) return null;

    const currentValue = fromData.value;
    const previousValue = toData.value;

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
