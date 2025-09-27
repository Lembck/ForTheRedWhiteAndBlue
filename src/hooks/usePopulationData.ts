import { PopulationRecord } from "@/types/population";
import { useEffect, useState } from "react";

export const usePopulationData = () => {
    const [currentPopulationData, setCurrentPopulationData] = useState<
        PopulationRecord | undefined
    >(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDebtData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/population");

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }

                const data: PopulationRecord = await response.json();
                console.log("HERE", data);

                if (data) {
                    setCurrentPopulationData(data);
                } else {
                    throw new Error("No Population data available");
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch Population data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDebtData();
    }, []);

    return { currentPopulationData, loading, error };
};
