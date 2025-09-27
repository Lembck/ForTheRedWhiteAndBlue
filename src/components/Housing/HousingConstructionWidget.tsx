"use client";

import React from "react";
import { formatMonthYear } from "@/utils/dateUtils";
import { useState, useEffect } from "react";
import { Skeleton } from "../ui/skeleton";
import WidgetCard from "../WidgetCard";
import { formatNumber } from "@/utils/numberUtils";

interface ConstructionData {
    buildingPermits: {
        total: number;
        date: string;
    };
    housingStarts: {
        total: number;
        date: string;
    };
    housingCompletions: {
        total: number;
        date: string;
    };
}

export function HousingConstructionWidget() {
    const [data, setData] = useState<ConstructionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/housing-construction");
                if (!response.ok) throw new Error("Failed to fetch");
                const constructionData = await response.json();
                setData(constructionData);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknown error");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (error) {
        return (
            <WidgetCard title="Error Loading Construction Data" error>
                <p className="text-sm text-zinc-400">{error}</p>
            </WidgetCard>
        );
    }

    return (
        <WidgetCard
            title="New Residential Construction Data"
            source="U.S. Census Bureau"
            sourceURL="https://www.census.gov/construction/nrc/"
        >
            <div className="space-y-4">
                {/* Building Permits */}
                <div className="flex items-baseline justify-between">
                    {loading ? (
                        <>
                            <div className="flex flex-col space-y-1">
                                <Skeleton className="h-4 w-32 bg-zinc-400/50" />
                                <Skeleton className="h-5 w-16 bg-emerald-400/50" />
                            </div>
                            <Skeleton className="h-4 w-20 bg-zinc-400/50" />
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col">
                                <span className="text-sm text-zinc-400">
                                    Building Permits
                                </span>
                                <span className="text-lg font-bold text-emerald-400">
                                    {formatNumber(data?.buildingPermits.total)}
                                </span>
                            </div>
                            <span className="text-sm text-zinc-400">
                                {formatMonthYear(
                                    data?.buildingPermits.date || ""
                                )}
                            </span>
                        </>
                    )}
                </div>

                {/* Housing Starts */}
                <div className="flex items-baseline justify-between">
                    {loading ? (
                        <>
                            <div className="flex flex-col space-y-1">
                                <Skeleton className="h-4 w-28 bg-zinc-400/50" />
                                <Skeleton className="h-5 w-16 bg-emerald-400/50" />
                            </div>
                            <Skeleton className="h-4 w-20 bg-zinc-400/50" />
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col">
                                <span className="text-sm text-zinc-400">
                                    Housing Starts
                                </span>
                                <span className="text-lg font-bold text-emerald-400">
                                    {formatNumber(data?.housingStarts.total)}
                                </span>
                            </div>
                            <span className="text-sm text-zinc-400">
                                {formatMonthYear(
                                    data?.housingStarts.date || ""
                                )}
                            </span>
                        </>
                    )}
                </div>

                {/* Housing Completions */}
                <div className="flex items-baseline justify-between">
                    {loading ? (
                        <>
                            <div className="flex flex-col space-y-1">
                                <Skeleton className="h-4 w-36 bg-zinc-400/50" />
                                <Skeleton className="h-5 w-16 bg-emerald-400/50" />
                            </div>
                            <Skeleton className="h-4 w-20 bg-zinc-400/50" />
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col">
                                <span className="text-sm text-zinc-400">
                                    Housing Completions
                                </span>
                                <span className="text-lg font-bold text-emerald-400">
                                    {formatNumber(
                                        data?.housingCompletions.total
                                    )}
                                </span>
                            </div>
                            <span className="text-sm text-zinc-400">
                                {formatMonthYear(
                                    data?.housingCompletions.date || ""
                                )}
                            </span>
                        </>
                    )}
                </div>
            </div>
        </WidgetCard>
    );
}
