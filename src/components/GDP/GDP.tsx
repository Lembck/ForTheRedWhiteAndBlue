"use client";

import React from "react";

import { useGDPData } from "@/hooks/useGDPData";
import { calculateChange, formatGDPValue, getQuarter } from "@/utils/gdpUtils";
import { GDPScrollingChanges } from "./GDPScrollingChanges";
import { Skeleton } from "../ui/skeleton";
import WidgetCard from "../WidgetCard";

const GDP: React.FC = () => {
    const {
        currentGdpData,
        previousGdpData,
        lastYearGdpData,
        twoYearsGdpData,
        loading,
        error,
    } = useGDPData();

    const lastQuarterChange = calculateChange(currentGdpData, previousGdpData);
    const lastYearChange = calculateChange(currentGdpData, lastYearGdpData);
    const twoYearChange = calculateChange(currentGdpData, twoYearsGdpData);
    const scrollingChanges = [lastQuarterChange, lastYearChange, twoYearChange];

    if (error) {
        return (
            <WidgetCard title="Error Loading GDP Data" error>
                <p className="text-sm text-zinc-400">{error}</p>
            </WidgetCard>
        );
    }

    return (
        <WidgetCard
            title="Gross Domestic Product (GDP)"
            source="Federal Reserve Economic Data (FRED)"
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
                            {`$${formatGDPValue(currentGdpData?.value)}B`}
                        </span>
                        <span className="h-5 text-lg font-semibold text-zinc-400">
                            {getQuarter(currentGdpData?.date)}
                        </span>
                    </>
                )}
            </div>
            <GDPScrollingChanges changes={scrollingChanges} loading={loading} />
        </WidgetCard>
    );
};

export default GDP;
