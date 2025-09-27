import React from "react";
import { GDPChangeIndicator } from "./GDPChangeIndicator";
import { CardDescription } from "@/components/ui/card";
import { GDPChangeData, GDPObservation } from "@/types/gdp";

interface GDPMetricsProps {
    lastQuarterChange: GDPChangeData | null;
    lastYearChange: GDPChangeData | null;
    previousGdpData: GDPObservation | null;
    lastYearGdpData: GDPObservation | null;
    loading: boolean;
}

export const GDPMetrics: React.FC<GDPMetricsProps> = ({
    lastQuarterChange,
    lastYearChange,
    previousGdpData,
    lastYearGdpData,
    loading,
}) => {
    return (
        <div className="space-y-2">
            <div className="flex flex-col items-center justify-between">
                <GDPChangeIndicator
                    change={lastQuarterChange}
                    comparisonData={previousGdpData}
                    label="since"
                    loading={loading}
                    includeYearInQuarter={false}
                />
                <GDPChangeIndicator
                    change={lastYearChange}
                    comparisonData={lastYearGdpData}
                    label="since"
                    loading={loading}
                    includeYearInQuarter={true}
                />
            </div>

            <CardDescription className="text-xs text-zinc-500">
                Source: Federal Reserve Economic Data (FRED)
            </CardDescription>
        </div>
    );
};
