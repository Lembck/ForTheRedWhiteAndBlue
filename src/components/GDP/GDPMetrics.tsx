import React, { useRef, useEffect, useState } from "react";
import { GDPChangeIndicator } from "./GDPChangeIndicator";
import { GDPChangeData } from "@/types/gdp";

interface GDPMetricsProps {
    changes: (GDPChangeData | null)[];
    loading: boolean;
}

export const GDPMetrics: React.FC<GDPMetricsProps> = ({ changes, loading }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = useState<number>(0);

    useEffect(() => {
        const calculateScrollWidth = () => {
            if (scrollContainerRef.current) {
                const firstChild = scrollContainerRef.current
                    .firstElementChild as HTMLElement;
                if (firstChild) {
                    const width = firstChild.offsetWidth;
                    setScrollWidth(width);
                }
            }
        };

        calculateScrollWidth();

        window.addEventListener("resize", calculateScrollWidth);

        const timeoutId = setTimeout(calculateScrollWidth, 100);

        return () => {
            window.removeEventListener("resize", calculateScrollWidth);
            clearTimeout(timeoutId);
        };
    }, [changes, loading]);

    return (
        <div className="space-y-3">
            <div className="overflow-hidden relative bg-zinc-800/30 rounded-md py-1 h-8">
                <div
                    ref={scrollContainerRef}
                    className="flex animate-scroll whitespace-nowrap"
                    style={
                        {
                            "--scroll-width": `${scrollWidth}px`,
                        } as React.CSSProperties & { "--scroll-width": string }
                    }
                >
                    <div className="flex items-center space-x-3 px-1.5 flex-shrink-0">
                        {!loading &&
                            changes.map((change, key) => (
                                <React.Fragment key={key}>
                                    <GDPChangeIndicator
                                        change={change}
                                        label="since"
                                        includeYearInQuarter={key != 0}
                                    />
                                    <span className="text-zinc-600">•</span>
                                </React.Fragment>
                            ))}
                    </div>

                    <div className="flex items-center space-x-3 px-1.5 flex-shrink-0">
                        {!loading &&
                            changes.map((change, key) => (
                                <React.Fragment key={key}>
                                    <GDPChangeIndicator
                                        change={change}
                                        label="since"
                                        includeYearInQuarter={key != 0}
                                    />
                                    <span className="text-zinc-600">•</span>
                                </React.Fragment>
                            ))}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(calc(-1 * var(--scroll-width)));
                    }
                }

                .animate-scroll {
                    animation: scroll 15s linear infinite;
                }

                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
};
