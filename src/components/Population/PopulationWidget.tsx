"use client";

import { usePopulationData } from "@/hooks/usePopulationData";
import { Skeleton } from "../ui/skeleton";
import WidgetCard from "../WidgetCard";
import { formatDate, parseCompactDate } from "@/utils/dateUtils";
import { formatNumber } from "@/utils/numberUtils";

const PopulationWidget = () => {
    const { currentPopulationData, loading } = usePopulationData();
    return (
        <WidgetCard
            title="Population"
            source="United States Census Bureau"
            sourceURL="https://www.census.gov/popclock/"
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
                            {formatNumber(currentPopulationData?.population)}
                        </span>
                        <span className="h-5 text-lg font-semibold text-zinc-400">
                            {formatDate(
                                parseCompactDate(
                                    currentPopulationData?.date
                                ).toString()
                            )}
                        </span>
                    </>
                )}
            </div>
        </WidgetCard>
    );
};

export default PopulationWidget;
