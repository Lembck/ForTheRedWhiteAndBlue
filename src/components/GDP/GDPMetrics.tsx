import React from "react";
import { GDPChangeIndicator } from "./GDPChangeIndicator";
import { CardDescription } from "@/components/ui/card";
import { GDPChangeData } from "@/types/gdp";

interface GDPMetricsProps {
    changes: (GDPChangeData | null)[];
    loading: boolean;
}
export const GDPMetrics: React.FC<GDPMetricsProps> = ({ changes, loading }) => {
    return (
        <div className="space-y-3">
            <div className="overflow-hidden relative bg-zinc-800/30 rounded-md py-1">
                <div className="flex animate-scroll whitespace-nowrap">
                    <div className="flex items-center space-x-3 px-2 flex-shrink-0">
                        {changes.map((change, key) => (
                            <React.Fragment key={key}>
                                <GDPChangeIndicator
                                    change={change}
                                    label="since"
                                    loading={loading}
                                    includeYearInQuarter={key != 0}
                                />
                                <span className="text-zinc-600">•</span>
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex items-center space-x-3 px-1 flex-shrink-0">
                        {changes.map((change, key) => (
                            <React.Fragment key={key}>
                                <GDPChangeIndicator
                                    change={change}
                                    label="since"
                                    loading={loading}
                                    includeYearInQuarter={key != 0}
                                />
                                <span className="text-zinc-600">•</span>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <CardDescription className="text-xs text-zinc-500">
                Source: Federal Reserve Economic Data (FRED)
            </CardDescription>
            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .animate-scroll {
                    animation: scroll 20s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};
