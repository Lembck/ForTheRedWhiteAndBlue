export interface GDPObservation {
    realtime_start: string;
    realtime_end: string;
    date: string;
    value: string;
}

export interface GDPResponse {
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

export interface GDPChangeData {
    absolute: number;
    percent: number;
    isPositive: boolean;
    dateString: string;
}
