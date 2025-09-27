import DebtWidget from "@/components/Debt/DebtWidget";
import GDPWidget from "@/components/GDP/GDPWidget";
import PopulationWidget from "@/components/Population/PopulationWidget";

export default function Home() {
    return (
        <div className="font-sans flex items-center justify-center min-h-screen bg-black text-white">
            <main className="flex flex-col items-center justify-center gap-[32px]">
                <GDPWidget />
                <DebtWidget />
                <PopulationWidget />
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
        </div>
    );
}
