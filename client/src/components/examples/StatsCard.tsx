import { StatsCard } from "../StatsCard";
import { FolderKanban } from "lucide-react";

export default function StatsCardExample() {
  return (
    <div className="p-4 max-w-xs">
      <StatsCard
        title="Active Campaigns"
        value="12"
        icon={FolderKanban}
        trend={{ value: 8.2, isPositive: true }}
      />
    </div>
  );
}
