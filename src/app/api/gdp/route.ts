import { NextResponse } from "next/server";

export async function GET() {
    try {
        const apiKey = process.env.FRED_API_KEY;

        const response = await fetch(
            `https://api.stlouisfed.org/fred/series/observations?series_id=GDP&api_key=${apiKey}&file_type=json&limit=5&sort_order=desc`
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("FRED API Error:", error);
        return NextResponse.json(
            { error: "Failed to fetch GDP data" },
            { status: 500 }
        );
    }
}
