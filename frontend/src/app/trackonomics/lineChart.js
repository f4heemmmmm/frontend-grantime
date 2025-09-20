import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";

const financialTrends = [
  { month: "Jan", spent: 12000, earned: 25000, bank: 50000 },
  { month: "Feb", spent: 18000, earned: 22000, bank: 54000 },
  { month: "Mar", spent: 15000, earned: 28000, bank: 67000 },
  { month: "Apr", spent: 20000, earned: 30000, bank: 77000 },
  { month: "May", spent: 22000, earned: 26000, bank: 81000 },
];

export function LineChartMultple() {
  return (
    <ChartContainer
      config={{
        spent: { label: "Money Spent", color: "red" },
        earned: { label: "Money Earned", color: "green" },
        bank: { label: "Money in Bank", color: "blue" },
      }}
      className="h-[400px] w-full"
    >
      <ResponsiveContainer>
        <LineChart data={financialTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="spent"
            stroke="red"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="earned"
            stroke="green"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="bank"
            stroke="blue"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
