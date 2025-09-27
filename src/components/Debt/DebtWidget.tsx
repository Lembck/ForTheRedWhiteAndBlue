"use client";

import { useDebtData } from "@/hooks/useDebtData";
import WidgetCard from "../WidgetCard";
import { Skeleton } from "../ui/skeleton";
import { formatMoney } from "@/utils/moneyUtils";
import { formatDate } from "@/utils/dateUtils";

const DebtWidget: React.FC = () => {
    const { currentDebtData, loading, error } = useDebtData();

    return (
        <WidgetCard
            title="Total Debt"
            source="U.S. Department of the Treasury"
            sourceURL="https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny"
        >
            <div className="flex items-baseline justify-between">
                {loading ? (
                    <>
                        <Skeleton className="h-6 my-1 w-36 bg-emerald-400/50" />
                        <Skeleton className="h-5 w-20 bg-zinc-400/50" />
                    </>
                ) : (
                    <>
                        <span className="text-2xl font-bold text-emerald-400">
                            {formatMoney(currentDebtData?.tot_pub_debt_out_amt)}
                        </span>
                        <span className="h-5 text-lg font-semibold text-zinc-400">
                            {formatDate(currentDebtData?.record_date)}
                        </span>
                    </>
                )}
            </div>
        </WidgetCard>
    );
};

export default DebtWidget;
