"use client";

import WidgetCard from "../WidgetCard";
import { Skeleton } from "../ui/skeleton";
import { formatMoney } from "@/utils/moneyUtils";
import { useSpendingData } from "@/hooks/useSpendingData";
import { formatDate } from "@/utils/dateUtils";
import { Separator } from "../ui/separator";
import { ResponsiveSankey } from "@nivo/sankey";
import { formatPercent } from "@/utils/numberUtils";

const SpendingWidget: React.FC = () => {
    const { currentSpending, loading } = useSpendingData();

    const totalSpending = currentSpending?.find(
        (record) => record.agency_nm == "Total"
    );

    const currentSpendingNodes =
        currentSpending?.slice(0, 10)?.map((record) => {
            return { id: record.agency_nm };
        }) || [];

    currentSpendingNodes.push({ id: "Federal Government" });
    currentSpendingNodes.push({ id: "Other" });

    const currentSpendingLinks =
        currentSpending?.slice(0, 10).map((record) => {
            return {
                source: "Federal Government",
                target: record.agency_nm,
                value: record.net_cost_bil_amt,
            };
        }) || [];

    const top10Sum = currentSpendingLinks.reduce(
        (accumulator, link) => accumulator + link.value,
        0
    );

    currentSpendingLinks.push({
        source: "Federal Government",
        target: "Other",
        value: (totalSpending?.net_cost_bil_amt ?? 0) - top10Sum,
    });

    const data = {
        nodes: currentSpendingNodes,
        links: currentSpendingLinks,
    };

    return (
        <WidgetCard
            title="Total Federal Spending"
            source="Fiscal Data - Treasury"
            sourceURL="https://fiscaldata.treasury.gov/datasets/u-s-government-financial-report/statements-of-net-cost"
            className={"w-[100%]"}
        >
            <div className="flex flex-col items-baseline justify-between">
                {loading ? (
                    <>
                        <Skeleton className="h-6 my-1 w-36 bg-emerald-400/50" />
                        <Skeleton className="h-5 w-20 bg-zinc-400/50" />
                    </>
                ) : (
                    <>
                        <div className="w-full flex items-baseline justify-between">
                            <span className="text-2xl font-bold text-emerald-400">
                                {formatMoney(totalSpending?.net_cost_bil_amt)}
                            </span>
                            <span className="h-5 text-lg font-semibold text-zinc-400">
                                {formatDate(
                                    totalSpending?.record_date.toDateString()
                                )}
                            </span>
                        </div>
                        <Separator className="my-1" />
                        {/*currentSpending?.map((record, key) => (
                            <div
                                className="w-full flex justify-between items-center"
                                key={key}
                            >
                                <span className="text-xl font-bold text-emerald-400">
                                    {formatMoney(record?.net_cost_bil_amt)}
                                </span>
                                <span className="h-5 text-md font-medium text-zinc-400">
                                    {record?.agency_nm}
                                </span>
                            </div>
                        ))*/}
                        <div
                            className="w-full h-[50vh] py-2"
                            style={{ transform: "translateZ(0)" }}
                        >
                            <ResponsiveSankey
                                data={data}
                                margin={{
                                    bottom: 4,
                                }}
                                align="justify"
                                nodeOpacity={1}
                                colors={{ scheme: "green_blue", size: 4 }}
                                nodeHoverOthersOpacity={0.35}
                                nodeThickness={18}
                                nodeSpacing={24}
                                nodeBorderWidth={0}
                                nodeBorderColor={{
                                    from: "color",
                                    modifiers: [["darker", 0.8]],
                                }}
                                nodeBorderRadius={3}
                                nodeTooltip={(node) => {
                                    return <div></div>;
                                }}
                                linkOpacity={0.6}
                                linkHoverOthersOpacity={0.2}
                                linkContract={0}
                                linkBlendMode="lighten"
                                linkTooltip={(link) => (
                                    <div
                                        className="bg-zinc-900 p-3 border border-emerald-700 rounded-md"
                                        style={{
                                            boxShadow:
                                                "0 2px 4px rgba(0,0,0,0.1)",
                                        }}
                                    >
                                        <div className="flex flex-col">
                                            <div className="font-bold text-nowrap text-zinc-300">
                                                {link.link.source.id} →{" "}
                                            </div>

                                            <div className="font-bold text-nowrap text-zinc-300">
                                                {link.link.target.id}
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center min-w-80">
                                            <span className="text-xl font-bold text-emerald-400">
                                                {formatMoney(link.link.value)}
                                            </span>
                                            <span className="text-xl text-end font-bold text-emerald-400">
                                                {`${formatPercent(
                                                    link.link.value /
                                                        totalSpending!
                                                            .net_cost_bil_amt
                                                )} of Total Spending`}
                                            </span>
                                        </div>
                                    </div>
                                )}
                                enableLinkGradient={true}
                                labelPosition="inside"
                                labelOrientation="horizontal"
                                labelPadding={16}
                                labelTextColor={{
                                    from: "color",
                                    modifiers: [["brighter", 0.3]],
                                }}
                                theme={{
                                    labels: {
                                        text: {
                                            fontWeight: 700,
                                            textShadow:
                                                "0px 0px 4px rgba(0,0,0,0.8)",
                                            fontSize: 14,
                                        },
                                    },
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </WidgetCard>
    );
};

export default SpendingWidget;
