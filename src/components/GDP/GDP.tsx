"use client";

import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useGDPData } from "@/hooks/useGDPData";
import { calculateChange } from "@/utils/gdpUtils";
import { GDPErrorCard } from "./GDPErrorCard";
import { GDPHeader } from "./GDPHeader";
import { GDPMetrics } from "./GDPMetrics";

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

    if (error) {
        return <GDPErrorCard error={error} />;
    }

    return (
        <Card className="w-sm bg-zinc-900 border-zinc-800 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-bold text-zinc-300">
                    Gross Domestic Product (GDP)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-3">
                    <GDPHeader gdpData={currentGdpData} loading={loading} />
                    <GDPMetrics
                        changes={[
                            lastQuarterChange,
                            lastYearChange,
                            twoYearChange,
                        ]}
                        loading={loading}
                    />
                    <CardDescription className="text-xs text-zinc-500">
                        Source: Federal Reserve Economic Data (FRED)
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    );
};

export default GDP;
