export interface IncomingFederalSpendingRecord {
    agency_nm: string;
    record_date: string;
    gross_cost_bil_amt: number;
    earned_revenue_bil_amt: number;
    subtotal_bil_amt: number;
    net_cost_bil_amt: number;
}

export interface FederalSpendingRecord {
    agency_nm: string;
    record_date: Date;
    gross_cost_bil_amt: number;
    earned_revenue_bil_amt: number;
    subtotal_bil_amt: number;
    net_cost_bil_amt: number;
}
