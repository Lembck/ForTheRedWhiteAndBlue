"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGDPData } from "../hooks/useGDPData";
import { calculateChange } from "../utils/gdpUtils";
import { GDPErrorCard } from "./GDP/GDPErrorCard";
import { GDPHeader } from "./GDP/GDPHeader";
import { GDPMetrics } from "./GDP/GDPMetrics";

const GDP: React.FC = () => {
    const { currentGdpData, previousGdpData, lastYearGdpData, loading, error } =
        useGDPData();

    const lastQuarterChange = calculateChange(currentGdpData, previousGdpData);
    const lastYearChange = calculateChange(currentGdpData, lastYearGdpData);

    if (error) {
        return <GDPErrorCard error={error} />;
    }

    return (
        <Card className="w-full max-w-md bg-zinc-900 border-zinc-800 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-bold text-zinc-300">
                    Gross Domestic Product (GDP)
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-3">
                    <GDPHeader gdpData={currentGdpData} loading={loading} />
                    <GDPMetrics
                        lastQuarterChange={lastQuarterChange}
                        lastYearChange={lastYearChange}
                        previousGdpData={previousGdpData}
                        lastYearGdpData={lastYearGdpData}
                        loading={loading}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default GDP;
