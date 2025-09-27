import { NextResponse } from "next/server";

export async function GET() {
    try {
        const apiKey = process.env.FRED_API_KEY;

        const response = await fetch(
            `https://api.stlouisfed.org/fred/series/observations?series_id=GDP&api_key=${apiKey}&file_type=json&limit=9&sort_order=desc`
        );

        if (!response.ok) {
            throw new Error(
                `FRED API Error: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
