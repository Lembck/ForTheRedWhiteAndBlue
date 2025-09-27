import { formatNumber } from "./numberUtils";

export const formatMoney = (amount: number | undefined): string => {
    return formatNumber(amount, "$");
};
