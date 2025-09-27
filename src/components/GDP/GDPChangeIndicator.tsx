import React from "react";
import { formatGDPValue, getQuarter } from "@/utils/gdpUtils";
import { GDPChangeData } from "@/types/gdp";

interface GDPChangeIndicatorProps {
    change: GDPChangeData | null;
    label: string;
    includeYearInQuarter?: boolean;
}

export const GDPChangeIndicator: React.FC<GDPChangeIndicatorProps> = ({
    change,
    label,
    includeYearInQuarter = false,
}) => {
    if (!change) return null;

    return (
        <div
            className={`flex items-center gap-1 text-xs font-medium ${
                change.isPositive ? "text-emerald-400" : "text-red-400"
            }`}
        >
            <span className="flex">
                {change.isPositive ? "+" : ""}$
                {formatGDPValue(change.absolute.toString())}B
            </span>
            <span className="text-zinc-500">
                ({change.isPositive ? "+" : ""}
                {change.percent.toFixed(1)}%)
            </span>
            <span className="flex items-center gap-2 text-sm text-zinc-500">
                <span className="text-xs flex items-center h-4">
                    {`${label} ${getQuarter(
                        change?.dateString,
                        includeYearInQuarter
                    )}`}
                </span>
            </span>
        </div>
    );
};
