import {
    FederalSpendingRecord,
    IncomingFederalSpendingRecord,
} from "@/types/spending";
import { useEffect, useState } from "react";

export const useSpendingData = () => {
    const [currentSpending, setCurrentSpendingData] = useState<
        FederalSpendingRecord[] | null
    >(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const updateToBillions = (
        input: IncomingFederalSpendingRecord
    ): FederalSpendingRecord => {
        return {
            ...input,
            record_date: new Date(input.record_date),
            gross_cost_bil_amt: input.gross_cost_bil_amt * 1000000000,
            earned_revenue_bil_amt: input.earned_revenue_bil_amt * 1000000000,
            subtotal_bil_amt: input.subtotal_bil_amt * 1000000000,
            net_cost_bil_amt: input.net_cost_bil_amt * 1000000000,
        };
    };

    useEffect(() => {
        const fetchSpendingData = async () => {
            try {
                setLoading(true);
                const response = await fetch(
                    "/api/treasury/statement_net_cost?fields=agency_nm,record_date,gross_cost_bil_amt,earned_revenue_bil_amt,subtotal_bil_amt,net_cost_bil_amt&sort=-record_date&filter=stmt_fiscal_year:in:(2024,2023),restmt_flag:in:(N)"
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error);
                }

                const data: { data: IncomingFederalSpendingRecord[] } =
                    await response.json();

                if (data.data && data.data.length > 0) {
                    const thisYear = data.data
                        .map((record: IncomingFederalSpendingRecord) =>
                            updateToBillions(record)
                        )
                        .map((record: FederalSpendingRecord) => {
                            if (
                                record.agency_nm ===
                                "Interest on Treasury Securities held by the public"
                            ) {
                                return {
                                    ...record,
                                    agency_nm:
                                        "Interest on Treasury Securities",
                                };
                            } else if (
                                record.agency_nm ===
                                "Department of Health and Human Services"
                            ) {
                                return {
                                    ...record,
                                    agency_nm:
                                        "Dept. of Health and Human Services",
                                };
                            } else {
                                return record;
                            }
                        })
                        .filter(
                            (record) =>
                                record.record_date.getFullYear() ===
                                new Date().getFullYear() - 1
                        );

                    setCurrentSpendingData(thisYear);
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

        fetchSpendingData();
    }, []);

    return { currentSpending, loading, error };
};
