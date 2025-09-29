import DebtWidget from "@/components/Debt/DebtWidget";
import GDPWidget from "@/components/GDP/GDPWidget";
import { HousingConstructionWidget } from "@/components/Housing/HousingConstructionWidget";
import HousingWidget from "@/components/Housing/HousingWidget";
import PopulationWidget from "@/components/Population/PopulationWidget";
import SpendingWidget from "@/components/Spending/SpendingWidget";

export default function Home() {
    return (
        <div className="font-sans flex items-center justify-center min-h-screen p-12">
            <main className="flex flex-wrap items-center justify-center gap-[32px]">
                <SpendingWidget />
                <GDPWidget />
                <DebtWidget />
                <PopulationWidget />
                <HousingWidget />
                <HousingConstructionWidget />
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}
