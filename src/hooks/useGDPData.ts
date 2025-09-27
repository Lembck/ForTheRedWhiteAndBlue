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
                    const twoYearsQuarter = data.observations[8] || null;

                    setCurrentGdpData(mostRecent);
                    setPreviousGdpData(previousQuarter);
                    setLastYearGdpData(lastYearQuarter);
                    setTwoYearsGdpData(twoYearsQuarter);
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
