import { useState } from "react";
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
import type { Campaign, Task, InsertCampaign } from "@shared/schema";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const mockCampaigns: Campaign[] = [
    {
      id: "1",
      name: "Iniciativa de Bem-Estar dos Funcionários",
      description: "Promover programas de saúde e bem-estar",
      status: "active",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-03-15"),
      budget: 15000,
      targetAudience: "Todos os funcionários",
      goals: "Aumentar participação em 40%",
      metrics: { reach: "1.245", engagement: "68%", duration: "2 meses", progress: 65 },
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Campanha de Diversidade e Inclusão",
      description: "Celebrar a diversidade no ambiente de trabalho",
      status: "active",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-04-30"),
      budget: 25000,
      targetAudience: "Todos os funcionários",
      goals: "Aumentar conscientização e engajamento",
      metrics: { reach: "2.100", engagement: "74%", duration: "3 meses", progress: 42 },
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Cultura de Trabalho Remoto",
      description: "Construir conexões fortes entre equipes remotas",
      status: "draft",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-05-31"),
      budget: 18000,
      targetAudience: "Funcionários remotos",
      goals: "Melhorar colaboração remota",
      metrics: { reach: "850", engagement: "0%", duration: "3 meses", progress: 0 },
      createdAt: new Date(),
    },
  ];

  const mockTasks: Task[] = [
    {
      id: "1",
      campaignId: "1",
      title: "Criar artes para redes sociais",
      description: "Criar visuais atraentes",
      assignee: "Sarah Chen",
      status: "pending",
      priority: "high",
      dueDate: new Date("2024-01-25"),
      createdAt: new Date(),
    },
    {
      id: "2",
      campaignId: "1",
      title: "Escrever conteúdo para blog",
      description: "Rascunhar artigo",
      assignee: "Mike Johnson",
      status: "completed",
      priority: "medium",
      dueDate: new Date("2024-01-20"),
      createdAt: new Date(),
    },
    {
      id: "3",
      campaignId: "2",
      title: "Agendar newsletter por e-mail",
      description: "Enviar para todos os funcionários",
      assignee: "Lisa Park",
      status: "pending",
      priority: "low",
      dueDate: new Date("2024-01-30"),
      createdAt: new Date(),
    },
  ];

  const chartData = [
    { name: "Jan", value: 245 },
    { name: "Fev", value: 389 },
    { name: "Mar", value: 512 },
    { name: "Abr", value: 678 },
    { name: "Mai", value: 823 },
    { name: "Jun", value: 956 },
  ];

  const handleCreateCampaign = (data: InsertCampaign) => {
    console.log("Creating campaign:", data);
    setIsCreateDialogOpen(false);
  };

  const filteredCampaigns = mockCampaigns.filter((campaign) =>
    campaign.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <CampaignForm onSubmit={handleCreateCampaign} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Campanhas Ativas"
          value="12"
          icon={FolderKanban}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatsCard
          title="Alcance Total"
          value="4.892"
          icon={Users}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatsCard
          title="Engajamento Médio"
          value="67%"
          icon={TrendingUp}
          trend={{ value: 3.1, isPositive: true }}
        />
        <StatsCard
          title="Orçamento Gasto"
          value="R$ 58mil"
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
          </div>
        </div>

        <div>
          <TaskList
            tasks={mockTasks}
            onToggleTask={(id) => console.log("Toggle task:", id)}
          />
        </div>
      </div>
    </div>
  );
}
