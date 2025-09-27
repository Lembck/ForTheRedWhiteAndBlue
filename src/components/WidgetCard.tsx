import { ReactNode } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "./ui/card";

interface WidgetCardProps {
    title: string;
    children: ReactNode;
    source?: string;
    sourceURL?: string;
    error?: boolean;
}

const WidgetCard: React.FC<WidgetCardProps> = ({
    title,
    children,
    source,
    sourceURL,
    error = false,
}) => {
    return (
        <Card
            className={`w-sm bg-zinc-900 ${
                error ? "border-red-800" : "border-zinc-800"
            } shadow-2xl`}
        >
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-md font-bold text-zinc-300">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-3">
                    {children}
                    {source ? (
                        <CardDescription className="text-xs text-zinc-500">
                            Source:{" "}
                            <a href={sourceURL} target="_new">
                                {source}
                            </a>
                        </CardDescription>
                    ) : (
                        <></>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};
export default WidgetCard;
