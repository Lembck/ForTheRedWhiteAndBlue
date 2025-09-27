import { useEffect, useState } from "react";

export const useDebtData = () => {
    const [currentDebtData, setCurrentDebtData] = useState<DebtRecord | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDebtData = async () => {
            try {
                setLoading(true);
                const response = await fetch("/api/debt");

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }

                const data: { data: DebtRecord[] } = await response.json();
                console.log(data);

                if (data.data && data.data.length > 0) {
                    const mostRecent = data.data[0];
                    setCurrentDebtData(mostRecent);
                } else {
                    throw new Error("No Debt data available");
                }
            } catch (err) {
                setError(
                    err instanceof Error
                        ? err.message
                        : "Failed to fetch Debt data"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDebtData();
    }, []);

    return { currentDebtData, loading, error };
};
