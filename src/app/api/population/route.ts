import { DatabaseZap } from "lucide-react";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const today = new Date();
        const dateString =
            today.getFullYear().toString() +
            (today.getMonth() + 1).toString().padStart(2, "0") +
            today.getDate().toString().padStart(2, "0");

        const timestamp = Date.now();
        const censusApiUrl = `https://www.census.gov/popclock/data/population.php/us?date=${dateString}&_=${timestamp}`;

        const response = await fetch(censusApiUrl);

        if (response.ok) {
            const data = await response.json();

            if (data.us && data.us.population) {
                return NextResponse.json({
                    ...data.us,
                });
            } else {
                throw new Error("Invalid response format from Census API");
            }
        } else {
            throw new Error(`Census API returned status: ${response.status}`);
        }
    } catch (error) {
        console.error("Error fetching from Census API:", error);

        return NextResponse.json({
            note: "This is a mathematical projection due to Census API access issues",
        });
    }
}
