import { NextResponse } from "next/server";

interface FredObservation {
    date: string;
    value: string;
}

interface FredResponse {
    observations: FredObservation[];
}

export async function GET() {
    try {
        const FRED_API_KEY = process.env.FRED_API_KEY;

        if (!FRED_API_KEY) {
            console.log("FRED_API_KEY not found, skipping FRED data fetch");
            return null;
        }

        try {
            const baseUrl =
                "https://api.stlouisfed.org/fred/series/observations";
            const params = new URLSearchParams({
                series_id: "",
                api_key: FRED_API_KEY,
                file_type: "json",
                limit: "12", // Get last 12 months
                sort_order: "desc",
            });

            // FRED series IDs for construction data
            const seriesIds = {
                permitsTotal: "PERMIT",
                startsTotal: "HOUST",
                completionsTotal: "COMPUTSA",
            };

            // Fetch all series concurrently
            const fetchPromises = Object.entries(seriesIds).map(
                async ([key, seriesId]) => {
                    params.set("series_id", seriesId);
                    const response = await fetch(`${baseUrl}?${params}`);
                    if (!response.ok)
                        throw new Error(
                            `FRED API error for ${seriesId}: ${response.status}`
                        );
                    const data: FredResponse = await response.json();
                    return { key, data: data.observations };
                }
            );

            const results = await Promise.all(fetchPromises);
            const dataMap = Object.fromEntries(
                results.map(({ key, data }) => [key, data])
            );

            const getLatestValue = (observations: FredObservation[]) => {
                const latest = observations.find((obs) => obs.value !== ".");
                return latest ? parseFloat(latest.value) : 0;
            };

            const getLatestDate = (observations: FredObservation[]) => {
                const latest = observations.find((obs) => obs.value !== ".");
                return latest
                    ? new Date(latest.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          timeZone: "UTC",
                      })
                    : "N/A";
            };

            return NextResponse.json({
                buildingPermits: {
                    total: (getLatestValue(dataMap.permitsTotal) * 1000) / 12,
                    date: getLatestDate(dataMap.permitsTotal),
                },
                housingStarts: {
                    total: (getLatestValue(dataMap.startsTotal) * 1000) / 12,
                    date: getLatestDate(dataMap.startsTotal),
                },
                housingCompletions: {
                    total:
                        (getLatestValue(dataMap.completionsTotal) * 1000) / 12,
                    date: getLatestDate(dataMap.completionsTotal),
                },
            });
        } catch (error) {
            console.error("Error fetching FRED data:", error);
            return null;
        }
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
