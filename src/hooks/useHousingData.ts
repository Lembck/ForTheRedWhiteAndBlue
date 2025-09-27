import { FREDHousingResponse } from "@/types/housing";
import { useEffect, useState } from "react";

export const useHousingData = () => {
    const [data, setData] = useState<FREDHousingResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGDPData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "/api/fred?series=ETOTALUSQ176N&order=desc"
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }

                const data: FREDHousingResponse = await response.json();

                if (data.observations && data.observations.length > 0) {
                    const cleanedData = {
                        ...data,
                        observations: data.observations.map((observation) => {
                            return {
                                ...observation,
                                value: observation.value * 1000,
                            };
                        }),
                    };
                    setData(cleanedData);
                } else {
                    throw new Error("No Housing data available");
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch Housing data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchGDPData();
    }, []);

    return {
        data,
        loading,
        error,
    };
};
