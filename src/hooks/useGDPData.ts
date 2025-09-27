import { GDPObservation, GDPResponse } from "@/types/gdp";
import { useEffect, useState } from "react";

export const useGDPData = () => {
    const [currentGdpData, setCurrentGdpData] = useState<GDPObservation | null>(
        null
    );
    const [previousGdpData, setPreviousGdpData] =
        useState<GDPObservation | null>(null);
    const [lastYearGdpData, setLastYearGdpData] =
        useState<GDPObservation | null>(null);
    const [twoYearsGdpData, setTwoYearsGdpData] =
        useState<GDPObservation | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const cleanValue = (input: GDPObservation): GDPObservation => {
        return {
            ...input,
            value: input.value * 1000000000,
        };
    };

    useEffect(() => {
        const fetchGDPData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "/api/fred?series=gdp&limit=9&order=desc"
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }

                const data: GDPResponse = await response.json();

                if (data.observations && data.observations.length > 0) {
                    const mostRecent = data.observations[0];
                    const previousQuarter = data.observations[1] || null;
                    const lastYearQuarter = data.observations[4] || null;
                    const twoYearsQuarter = data.observations[8] || null;

                    console.log(mostRecent);
                    console.log(cleanValue(mostRecent));

                    setCurrentGdpData(cleanValue(mostRecent));
                    setPreviousGdpData(cleanValue(previousQuarter));
                    setLastYearGdpData(cleanValue(lastYearQuarter));
                    setTwoYearsGdpData(cleanValue(twoYearsQuarter));
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

    return {
        currentGdpData,
        previousGdpData,
        lastYearGdpData,
        twoYearsGdpData,
        loading,
        error,
    };
};
