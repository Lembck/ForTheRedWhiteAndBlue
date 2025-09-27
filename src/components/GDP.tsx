"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Calendar, TrendingUp, TrendingDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GDPObservation {
    realtime_start: string;
    realtime_end: string;
    date: string;
    value: string;
}

interface GDPResponse {
    realtime_start: string;
    realtime_end: string;
    observation_start: string;
    observation_end: string;
    units: string;
    output_type: number;
    file_type: string;
    order_by: string;
    sort_order: string;
    count: number;
    offset: number;
    limit: number;
    observations: GDPObservation[];
}

const GDP: React.FC = () => {
    const [gdpData, setGdpData] = useState<GDPObservation | null>(null);
    const [previousGdpData, setPreviousGdpData] =
        useState<GDPObservation | null>(null);
    const [lastYearGdpData, setLastYearGdpData] =
        useState<GDPObservation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGDPData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/gdp");

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data: GDPResponse = await response.json();

                if (data.observations && data.observations.length > 0) {
                    const mostRecent = data.observations[0];
                    const previousQuarter = data.observations[1] || null;
                    const lastYearQuarter = data.observations[4] || null;
                    setGdpData(mostRecent);
                    setPreviousGdpData(previousQuarter);
                    setLastYearGdpData(lastYearQuarter);
                } else {
                    throw new Error("No GDP data available");
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch GDP data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGDPData();
    }, []);

    const formatGDPValue = (value?: string): string => {
        if (!value) return "";
        const numValue = parseFloat(value);
        if (isNaN(numValue)) return value;

        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1,
        }).format(numValue);
    };

    const getQuarter = (
        dateString?: string,
        includeYear: boolean = true
    ): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const month = date.getUTCMonth();
        const quarter = Math.floor(month / 3) + 1;
        return `Q${quarter} ${includeYear ? date.getUTCFullYear() : ""}`;
    };

    const calculateChange = (
        fromData: GDPObservation | null,
        toData: GDPObservation | null
    ) => {
        if (!fromData?.value || !toData?.value) return null;

        const currentValue = parseFloat(fromData.value);
        const previousValue = parseFloat(toData.value);

        if (isNaN(currentValue) || isNaN(previousValue)) return null;

        const change = currentValue - previousValue;
        const percentChange = (change / previousValue) * 100;

        return {
            absolute: change,
            percent: percentChange,
            isPositive: change >= 0,
        };
    };

    const lastQuarterChange = calculateChange(gdpData, previousGdpData);
    const lastYearChange = calculateChange(gdpData, lastYearGdpData);

    if (error) {
        return (
            <Card className="w-full max-w-md bg-zinc-900 border-red-800">
                <CardHeader>
                    <CardTitle className="text-red-400">
                        Error Loading GDP Data
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-zinc-400">{error}</p>
                </CardContent>
            </Card>
        );
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

                    <div className="space-y-2">
                        <div className="flex flex-col items-center justify-between">
                            {!loading && lastQuarterChange && (
                                <div
                                    className={`flex items-center gap-1 text-xs font-medium ${
                                        lastQuarterChange.isPositive
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    <span className="flex">
                                        {lastQuarterChange.isPositive
                                            ? "+"
                                            : ""}
                                        $
                                        {formatGDPValue(
                                            lastQuarterChange.absolute.toString()
                                        )}
                                        B
                                    </span>
                                    <span className="text-zinc-500">
                                        (
                                        {lastQuarterChange.isPositive
                                            ? "+"
                                            : ""}
                                        {lastQuarterChange.percent.toFixed(1)}%)
                                    </span>
                                    <span className="flex items-center gap-2 text-sm text-zinc-500">
                                        {loading ? (
                                            <Skeleton className="h-4 w-20 bg-zinc-700" />
                                        ) : (
                                            <span className="text-xs flex items-center h-4">
                                                since{" "}
                                                {getQuarter(
                                                    previousGdpData?.date,
                                                    false
                                                )}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}
                            {!loading && lastYearChange && (
                                <div
                                    className={`flex items-center gap-1 text-xs font-medium ${
                                        lastYearChange.isPositive
                                            ? "text-emerald-400"
                                            : "text-red-400"
                                    }`}
                                >
                                    <span className="flex">
                                        {lastYearChange.isPositive ? "+" : ""}$
                                        {formatGDPValue(
                                            lastYearChange.absolute.toString()
                                        )}
                                        B
                                    </span>
                                    <span className="text-zinc-500">
                                        ({lastYearChange.isPositive ? "+" : ""}
                                        {lastYearChange.percent.toFixed(1)}%)
                                    </span>
                                    <span className="flex items-center gap-2 text-sm text-zinc-500">
                                        {loading ? (
                                            <Skeleton className="h-4 w-20 bg-zinc-700" />
                                        ) : (
                                            <span className="text-xs flex items-center h-4">
                                                since{" "}
                                                {getQuarter(
                                                    lastYearGdpData?.date
                                                )}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}
                        </div>

                        <CardDescription className="text-xs text-zinc-500">
                            Source: Federal Reserve Economic Data (FRED)
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default GDP;
