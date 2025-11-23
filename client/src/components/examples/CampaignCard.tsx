import { CampaignCard } from "../CampaignCard";

export default function CampaignCardExample() {
  const mockCampaign = {
    id: "1",
    name: "Employee Wellness Initiative",
    description: "Promote health and wellness programs across the organization",
    status: "active",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-03-15"),
    budget: 15000,
    targetAudience: "All employees",
    goals: "Increase wellness program participation by 40%",
    metrics: {
      reach: "1,245",
      engagement: "68%",
      duration: "2 months",
      progress: 65,
    },
    createdAt: new Date(),
  };

  return (
    <div className="p-4 max-w-md">
      <CampaignCard
        campaign={mockCampaign}
        onView={() => console.log("View clicked")}
        onEdit={() => console.log("Edit clicked")}
      />
    </div>
  );
}
