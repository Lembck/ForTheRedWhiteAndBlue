import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface GDPErrorCardProps {
    error: string;
}

export const GDPErrorCard: React.FC<GDPErrorCardProps> = ({ error }) => {
    return (
        <Card className="w-full max-w-md bg-zinc-900 border-red-800">
            <CardHeader>
                <CardTitle className="text-red-400">
                    Error Loading GDP Data
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-zinc-400">{error}</p>
            </CardContent>
        </Card>
    );
};
