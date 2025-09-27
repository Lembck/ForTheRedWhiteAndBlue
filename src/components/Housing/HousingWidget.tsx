"use client";

import React from "react";

import { Skeleton } from "../ui/skeleton";
import WidgetCard from "../WidgetCard";
import { useHousingData } from "@/hooks/useHousingData";
import { getQuarter } from "@/utils/dateUtils";

const HousingWidget: React.FC = () => {
    const { data, loading, error } = useHousingData();

    if (error) {
        return (
            <WidgetCard title="Error Loading Housing Data" error>
                <p className="text-sm text-zinc-400">{error}</p>
            </WidgetCard>
        );
    }
    return (
        <WidgetCard
            title="Total Housing Units"
            source="Federal Reserve Economic Data (FRED)"
            sourceURL="https://fred.stlouisfed.org/series/ETOTALUSQ176N/"
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
                            {Number(data?.observations[0].value) / 1000}M
                        </span>
                        <span className="h-5 text-lg font-semibold text-zinc-400">
                            {getQuarter(data?.observations[0].date)}
                        </span>
                    </>
                )}
            </div>
        </WidgetCard>
    );
};

export default HousingWidget;
