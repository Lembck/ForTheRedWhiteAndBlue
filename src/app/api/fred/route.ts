import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const apiKey = process.env.FRED_API_KEY;
        const { searchParams } = new URL(request.url);
        const series = searchParams.get("series");
        const limit = searchParams.get("limit");
        const order = searchParams.get("order");

        const sortOrder = order ? `&sort_order=${order}` : "";
        const limitText = limit ? `&limit=${limit}` : "";

        const response = await fetch(
            `https://api.stlouisfed.org/fred/series/observations?series_id=${series}&api_key=${apiKey}&file_type=json${limitText}${sortOrder}`
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
