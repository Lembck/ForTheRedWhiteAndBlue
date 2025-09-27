import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { GDPObservation } from "@/types/gdp";
import { formatGDPValue, getQuarter } from "@/utils/gdpUtils";

interface GDPHeaderProps {
    gdpData: GDPObservation | null;
    loading: boolean;
}

export const GDPHeader: React.FC<GDPHeaderProps> = ({ gdpData, loading }) => {
    return (
        <div className="flex items-baseline justify-between">
            {loading ? (
                <Skeleton className="h-6 my-1 w-36 bg-emerald-400/50" />
            ) : (
                <span className="text-2xl font-bold text-emerald-400">
                    ${formatGDPValue(gdpData?.value)}B
                </span>
            )}

            {loading ? (
                <Skeleton className="h-5 w-20 bg-zinc-700" />
            ) : (
                <span className="h-5 text-lg font-semibold text-zinc-400">
                    {getQuarter(gdpData?.date)}
                </span>
            )}
        </div>
    );
};
