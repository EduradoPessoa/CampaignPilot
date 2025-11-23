import { AnalyticsChart } from "../AnalyticsChart";

export default function AnalyticsChartExample() {
  const mockData = [
    { name: "Jan", value: 245 },
    { name: "Feb", value: 389 },
    { name: "Mar", value: 512 },
    { name: "Apr", value: 678 },
    { name: "May", value: 823 },
    { name: "Jun", value: 956 },
  ];

  return (
    <div className="p-4">
      <AnalyticsChart
        title="Campaign Engagement"
        data={mockData}
        type="area"
      />
    </div>
  );
}
