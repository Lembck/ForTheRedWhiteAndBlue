import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams, pathname } = new URL(request.url);
    const dataset = pathname.split("/").pop();

    try {
        const response = await fetch(
            `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/${dataset}?${searchParams.toString()}`
        );

        if (!response.ok) {
            throw new Error(
                `Fiscal Data Treasury.gov API Error: ${response.status} ${response.statusText}`
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
