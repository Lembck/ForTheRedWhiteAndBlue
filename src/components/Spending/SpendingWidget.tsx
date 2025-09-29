"use client";

import WidgetCard, { WidthSize } from "../WidgetCard";
import { Skeleton } from "../ui/skeleton";
import { formatMoney } from "@/utils/moneyUtils";
import { useSpendingData } from "@/hooks/useSpendingData";
import { formatDate } from "@/utils/dateUtils";
import { Separator } from "../ui/separator";

const SpendingWidget: React.FC = () => {
    const { currentSpending, loading } = useSpendingData();

    const totalSpending = currentSpending?.find(
        (record) => record.agency_nm == "Total"
    );

    return (
        <WidgetCard
            title="Total Spending"
            source="Fiscal Data - Treasury"
            sourceURL="https://fiscaldata.treasury.gov/datasets/u-s-government-financial-report/statements-of-net-cost"
            width={WidthSize["2xl"]}
        >
            <div className="flex flex-col items-baseline justify-between">
                {loading ? (
                    <>
                        <Skeleton className="h-6 my-1 w-36 bg-emerald-400/50" />
                        <Skeleton className="h-5 w-20 bg-zinc-400/50" />
                    </>
                ) : (
                    <>
                        <div className="w-full flex items-baseline justify-between">
                            <span className="text-2xl font-bold text-emerald-400">
                                {formatMoney(totalSpending?.net_cost_bil_amt)}
                            </span>
                            <span className="h-5 text-lg font-semibold text-zinc-400">
                                {formatDate(
                                    totalSpending?.record_date.toDateString()
                                )}
                            </span>
                        </div>
                        <Separator className="my-1" />
                        {currentSpending?.map((record, key) => (
                            <div
                                className="w-full flex justify-between items-center"
                                key={key}
                            >
                                <span className="text-xl font-bold text-emerald-400">
                                    {formatMoney(record?.net_cost_bil_amt)}
                                </span>
                                <span className="h-5 text-md font-medium text-zinc-400">
                                    {record?.agency_nm}
                                </span>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </WidgetCard>
    );
};

export default SpendingWidget;
