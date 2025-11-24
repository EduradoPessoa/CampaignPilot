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
      name: "Iniciativa de Bem-Estar dos Funcionários",
      description: "Promover programas de saúde e bem-estar em toda a organização",
      status: "active",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-03-15"),
      budget: 15000,
      targetAudience: "Todos os funcionários",
      goals: "Aumentar participação em programas de bem-estar em 40%",
      metrics: { reach: "1.245", engagement: "68%", duration: "2 meses", progress: 65 },
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Campanha de Diversidade e Inclusão",
      description: "Celebrar a diversidade e promover cultura inclusiva no ambiente de trabalho",
      status: "active",
      startDate: new Date("2024-02-01"),
      endDate: new Date("2024-04-30"),
      budget: 25000,
      targetAudience: "Todos os funcionários",
      goals: "Aumentar conscientização e engajamento em iniciativas de D&I",
      metrics: { reach: "2.100", engagement: "74%", duration: "3 meses", progress: 42 },
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Cultura de Trabalho Remoto",
      description: "Construir conexões fortes entre membros de equipes remotas",
      status: "draft",
      startDate: new Date("2024-03-01"),
      endDate: new Date("2024-05-31"),
      budget: 18000,
      targetAudience: "Funcionários remotos",
      goals: "Melhorar colaboração remota e integração da equipe",
      metrics: { reach: "850", engagement: "0%", duration: "3 meses", progress: 0 },
      createdAt: new Date(),
    },
    {
      id: "4",
      name: "Desenvolvimento de Liderança",
      description: "Capacitar futuros líderes com treinamento e mentoria",
      status: "completed",
      startDate: new Date("2023-10-01"),
      endDate: new Date("2023-12-31"),
      budget: 35000,
      targetAudience: "Gerentes e equipe sênior",
      goals: "Completar treinamento de liderança para 50 funcionários",
      metrics: { reach: "52", engagement: "92%", duration: "3 meses", progress: 100 },
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Programa de Reconhecimento de Funcionários",
      description: "Celebrar e reconhecer contribuições excepcionais dos funcionários",
      status: "active",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      budget: 20000,
      targetAudience: "Todos os funcionários",
      goals: "Aumentar satisfação e retenção de funcionários",
      metrics: { reach: "3.200", engagement: "81%", duration: "12 meses", progress: 28 },
      createdAt: new Date(),
    },
    {
      id: "6",
      name: "Integração de Novos Funcionários 2024",
      description: "Receber e integrar novos membros da equipe de forma eficaz",
      status: "active",
      startDate: new Date("2024-01-01"),
      endDate: new Date("2024-12-31"),
      budget: 12000,
      targetAudience: "Novos contratados",
      goals: "Reduzir tempo de produtividade para novos funcionários",
      metrics: { reach: "145", engagement: "88%", duration: "12 meses", progress: 15 },
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
          <h1 className="text-2xl font-semibold">Campanhas</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie todas as suas campanhas de marketing de RH
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

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar campanhas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-campaigns"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="draft">Rascunho</SelectItem>
            <SelectItem value="active">Ativa</SelectItem>
            <SelectItem value="completed">Concluída</SelectItem>
            <SelectItem value="archived">Arquivada</SelectItem>
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
          <p className="text-muted-foreground">Nenhuma campanha encontrada</p>
        </div>
      )}
    </div>
  );
}
