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
                <Skeleton className="h-8 w-36 bg-emerald-400/50" />
            ) : (
                <span className="text-2xl font-bold text-emerald-400">
                    ${formatGDPValue(gdpData?.value)}B
                </span>
            )}
            <div className="flex items-center gap-2 text-lg font-medium text-zinc-400">
                {loading ? (
                    <Skeleton className="h-4 w-20 bg-zinc-700" />
                ) : (
                    <span className="flex items-center h-4">
                        {getQuarter(gdpData?.date)}
                    </span>
                )}
            </div>
        </div>
    );
};
