import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { StatsCard } from "@/components/StatsCard";
import { CampaignCard } from "@/components/CampaignCard";
import { TaskList } from "@/components/TaskList";
import { AnalyticsChart } from "@/components/AnalyticsChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FolderKanban, Users, TrendingUp, DollarSign, Plus, Search } from "lucide-react";
import { CampaignForm } from "@/components/CampaignForm";
import { campaignApi, taskApi } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import type { InsertCampaign } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: campaigns = [], isLoading: campaignsLoading } = useQuery({
    queryKey: ["/api/campaigns"],
    queryFn: campaignApi.getAll,
  });

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["/api/tasks"],
    queryFn: taskApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: campaignApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      setIsCreateDialogOpen(false);
      toast({
        title: "Campanha criada",
        description: "A campanha foi criada com sucesso.",
      });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      taskApi.update(id, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
    },
  });

  const handleCreateCampaign = (data: InsertCampaign) => {
    createMutation.mutate(data);
  };

  const handleToggleTask = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      const newStatus = task.status === "completed" ? "pending" : "completed";
      updateTaskMutation.mutate({ id: taskId, status: newStatus });
    }
  };

  const filteredCampaigns = campaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 4);

  const recentTasks = tasks.slice(0, 5);

  // Calculate stats
  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalReach = campaigns.reduce((sum, c) => {
    const metrics = c.metrics as any;
    const reach = parseInt(metrics?.reach?.replace(/\D/g, "") || "0");
    return sum + reach;
  }, 0);
  const avgEngagement = campaigns.length > 0
    ? Math.round(campaigns.reduce((sum, c) => {
        const metrics = c.metrics as any;
        const engagement = parseInt(metrics?.engagement?.replace("%", "") || "0");
        return sum + engagement;
      }, 0) / campaigns.length)
    : 0;
  const totalBudget = campaigns.reduce((sum, c) => sum + (c.budget || 0), 0);

  const chartData = [
    { name: "Jan", value: 245 },
    { name: "Fev", value: 389 },
    { name: "Mar", value: 512 },
    { name: "Abr", value: 678 },
    { name: "Mai", value: 823 },
    { name: "Jun", value: 956 },
  ];

  const isLoading = campaignsLoading || tasksLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Carregando painel...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Painel</h1>
          <p className="text-sm text-muted-foreground">
            Monitore e gerencie suas campanhas de marketing de RH
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-create-campaign">
              <Plus className="h-4 w-4 mr-2" />
              Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Campanha</DialogTitle>
            </DialogHeader>
            <CampaignForm onSubmit={handleCreateCampaign} isLoading={createMutation.isPending} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Campanhas Ativas"
          value={activeCampaigns.toString()}
          icon={FolderKanban}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Alcance Total"
          value={totalReach.toLocaleString()}
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Engajamento Médio"
          value={`${avgEngagement}%`}
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatsCard
          title="Orçamento Total"
          value={`R$ ${(totalBudget / 1000).toFixed(0)}mil`}
          icon={DollarSign}
          trend={{ value: 5.4, isPositive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AnalyticsChart
            title="Desempenho das Campanhas ao Longo do Tempo"
            data={chartData}
            type="area"
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Campanhas Recentes</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar campanhas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                  data-testid="input-search-campaigns"
                />
              </div>
            </div>

            {filteredCampaigns.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {campaigns.length === 0 ? "Nenhuma campanha criada ainda" : "Nenhuma campanha encontrada"}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredCampaigns.map((campaign) => (
                  <CampaignCard
                    key={campaign.id}
                    campaign={campaign}
                    onView={() => console.log("View campaign:", campaign.id)}
                    onEdit={() => console.log("Edit campaign:", campaign.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        <div>
          <TaskList
            tasks={recentTasks}
            onToggleTask={handleToggleTask}
          />
        </div>
      </div>
    </div>
  );
}
