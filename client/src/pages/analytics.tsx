import { AnalyticsChart } from "@/components/AnalyticsChart";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Target, BarChart3 } from "lucide-react";

export default function Analytics() {
  const engagementData = [
    { name: "Week 1", value: 245 },
    { name: "Week 2", value: 389 },
    { name: "Week 3", value: 512 },
    { name: "Week 4", value: 678 },
  ];

  const reachData = [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1580 },
    { name: "Mar", value: 2100 },
    { name: "Apr", value: 2450 },
    { name: "May", value: 3100 },
    { name: "Jun", value: 3800 },
  ];

  const budgetData = [
    { name: "Q1", value: 45000 },
    { name: "Q2", value: 52000 },
    { name: "Q3", value: 48000 },
    { name: "Q4", value: 58000 },
  ];

  const campaignPerformance = [
    { name: "Employee Wellness", reach: 1245, engagement: 68, budget: 15000 },
    { name: "Diversity & Inclusion", reach: 2100, engagement: 74, budget: 25000 },
    { name: "Leadership Dev", reach: 52, engagement: 92, budget: 35000 },
    { name: "Recognition Program", reach: 3200, engagement: 81, budget: 20000 },
    { name: "New Hire Onboarding", reach: 145, engagement: 88, budget: 12000 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Analytics</h1>
        <p className="text-sm text-muted-foreground">
          Track performance and insights across all campaigns
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Reach"
          value="12,458"
          icon={Users}
          trend={{ value: 15.3, isPositive: true }}
        />
        <StatsCard
          title="Avg Engagement"
          value="76%"
          icon={TrendingUp}
          trend={{ value: 8.7, isPositive: true }}
        />
        <StatsCard
          title="Total Budget"
          value="$203K"
          icon={DollarSign}
          trend={{ value: 12.1, isPositive: false }}
        />
        <StatsCard
          title="Goal Completion"
          value="68%"
          icon={Target}
          trend={{ value: 5.2, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Engagement Trends"
          data={engagementData}
          type="area"
        />
        <AnalyticsChart
          title="Reach Growth"
          data={reachData}
          type="line"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Budget Allocation"
          data={budgetData}
          type="area"
        />

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Campaign Performance Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {campaignPerformance.map((campaign, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{campaign.name}</span>
                    <span className="text-muted-foreground">{campaign.engagement}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${campaign.engagement}%` }}
                    />
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>Reach: {campaign.reach.toLocaleString()}</span>
                    <span>Budget: ${campaign.budget.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
