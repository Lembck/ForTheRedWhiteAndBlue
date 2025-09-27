"use client";

import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, DollarSign } from "lucide-react";
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
                    setGdpData(mostRecent);
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

    const formatDate = (dateString?: string): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const getQuarter = (dateString?: string): string => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const month = date.getMonth();
        const quarter = Math.floor(month / 3) + 1;
        return `Q${quarter} ${date.getFullYear()}`;
    };

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
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-zinc-100">
                    US Gross Domestic Product
                </CardTitle>
                <DollarSign className="h-4 w-4 text-zinc-400" />
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center justify-between">
                        {loading ? (
                            <Skeleton className="h-8 w-32 bg-zinc-700" />
                        ) : (
                            <span className="text-2xl font-bold text-emerald-400">
                                ${formatGDPValue(gdpData?.value)}B
                            </span>
                        )}

                        <Badge
                            variant="secondary"
                            className="flex items-center gap-1 bg-zinc-800 text-zinc-300 border-zinc-700"
                        >
                            <TrendingUp className="h-3 w-3" />
                            Nominal
                        </Badge>
                    </div>

                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-zinc-400">
                            <Calendar className="h-4 w-4" />
                            {loading ? (
                                <Skeleton className="h-4 w-40 bg-zinc-700" />
                            ) : (
                                <span className="flex items-center h-4">
                                    {getQuarter(gdpData?.date)} •{" "}
                                    {formatDate(gdpData?.date)}
                                </span>
                            )}
                        </div>

                        <CardDescription className="text-xs text-zinc-500">
                            Source: Federal Reserve Economic Data (FRED)
                            <br />
                            <span className="flex items-center">
                                Last updated:{" "}
                                {loading ? (
                                    <Skeleton className="ml-1 h-3 w-1/2 bg-zinc-800" />
                                ) : (
                                    formatDate(gdpData?.realtime_end)
                                )}
                            </span>
                        </CardDescription>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default GDP;
