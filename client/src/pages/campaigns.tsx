import { useState } from "react";
import { CampaignCard } from "@/components/CampaignCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Search, Filter } from "lucide-react";
import { CampaignForm } from "@/components/CampaignForm";
import type { Campaign, InsertCampaign } from "@shared/schema";

export default function Campaigns() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const mockCampaigns: Campaign[] = [
    {
      id: "1",
      name: "Employee Wellness Initiative",
      description: "Promote health and wellness programs across the organization",
      status: "active",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-03-15"),
      budget: 15000,
      targetAudience: "All employees",
      goals: "Increase wellness program participation by 40%",
      metrics: { reach: "1,245", engagement: "68%", duration: "2 months", progress: 65 },
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Diversity & Inclusion Campaign",
      description: "Celebrate diversity and promote inclusive workplace culture",
      status: "active",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-04-30"),
      budget: 25000,
      targetAudience: "All employees",
      goals: "Raise awareness and engagement on D&I initiatives",
      metrics: { reach: "2,100", engagement: "74%", duration: "3 months", progress: 42 },
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Remote Work Culture",
      description: "Build strong connections among remote team members",
      status: "draft",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-05-31"),
      budget: 18000,
      targetAudience: "Remote employees",
      goals: "Improve remote collaboration and team bonding",
      metrics: { reach: "850", engagement: "0%", duration: "3 months", progress: 0 },
      createdAt: new Date(),
    },
    {
      id: "4",
      name: "Leadership Development",
      description: "Empower future leaders with training and mentorship",
      status: "completed",
      startDate: new Date("2023-10-01"),
      endDate: new Date("2023-12-31"),
      budget: 35000,
      targetAudience: "Managers and senior staff",
      goals: "Complete leadership training for 50 employees",
      metrics: { reach: "52", engagement: "92%", duration: "3 months", progress: 100 },
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Employee Recognition Program",
      description: "Celebrate and recognize outstanding employee contributions",
      status: "active",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      budget: 20000,
      targetAudience: "All employees",
      goals: "Increase employee satisfaction and retention",
      metrics: { reach: "3,200", engagement: "81%", duration: "12 months", progress: 28 },
      createdAt: new Date(),
    },
    {
      id: "6",
      name: "New Hire Onboarding 2024",
      description: "Welcome and integrate new team members effectively",
      status: "active",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      budget: 12000,
      targetAudience: "New hires",
      goals: "Reduce time-to-productivity for new employees",
      metrics: { reach: "145", engagement: "88%", duration: "12 months", progress: 15 },
      createdAt: new Date(),
    },
  ];

  const handleCreateCampaign = (data: InsertCampaign) => {
    console.log("Creating campaign:", data);
    setIsCreateDialogOpen(false);
  };

  const filteredCampaigns = mockCampaigns.filter((campaign) => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Campaigns</h1>
          <p className="text-sm text-muted-foreground">
            Manage all your HR marketing campaigns
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-campaign">
              <Plus className="h-4 w-4 mr-2" />
              New Campaign
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Campaign</DialogTitle>
            </DialogHeader>
            <CampaignForm onSubmit={handleCreateCampaign} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-campaigns"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCampaigns.map((campaign) => (
          <CampaignCard
            key={campaign.id}
            campaign={campaign}
            onView={() => console.log("View campaign:", campaign.id)}
            onEdit={() => console.log("Edit campaign:", campaign.id)}
          />
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No campaigns found</p>
        </div>
      )}
    </div>
  );
}
