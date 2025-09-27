import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch(
            `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&format=json&page[number]=1&page[size]=1`
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
