"use client";

import { Pie, PieChart } from "recharts";

import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

export const description = "Restricted vs. Unrestricted Funds";

const chartData = [
  { fund: "restricted", value: 80000, fill: "#EF4444" }, // red-500
  { fund: "unrestricted", value: 45000, fill: "#22C55E" }, // green-500
];

const chartConfig = {
  value: {
    label: "Funds",
  },
  restricted: {
    label: "Restricted Funds",
    color: "#EF4444",
  },
  unrestricted: {
    label: "Unrestricted Funds",
    color: "#22C55E",
  },
};

export function PieChartRestricted() {
  return (
    <ChartContainer config={chartConfig} className="h-[350px] w-full">
      <PieChart>
        <Pie data={chartData} dataKey="value" nameKey="fund" />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend
          content={<ChartLegendContent nameKey="fund" />}
          className="-translate-y-2 flex-wrap gap-2 *:basis-1/2 *:justify-center"
        />
      </PieChart>
    </ChartContainer>
  );
}
