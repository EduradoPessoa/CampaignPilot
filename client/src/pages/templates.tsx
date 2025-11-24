import { useState } from "react";
import { TemplateCard } from "@/components/TemplateCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import type { Template } from "@shared/schema";

export default function Templates() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const mockTemplates: Template[] = [
    {
      id: "1",
      name: "Integração de Novos Funcionários",
      description: "Receba novos funcionários com uma campanha abrangente de integração que inclui orientação, cronogramas de treinamento e apresentações da equipe",
      category: "Integração",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Programa de Bem-Estar dos Funcionários",
      description: "Promova iniciativas de saúde e bem-estar incluindo desafios de fitness, recursos de saúde mental e dicas de estilo de vida saudável",
      category: "Bem-Estar",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Iniciativa de Diversidade e Inclusão",
      description: "Celebre a diversidade e promova cultura inclusiva com campanhas de conscientização, histórias de funcionários e conteúdo educacional",
      category: "Cultura",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "4",
      name: "Desenvolvimento de Liderança",
      description: "Cultive futuros líderes com programas de treinamento, oportunidades de mentoria e workshops de liderança",
      category: "Treinamento",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Reconhecimento de Funcionários",
      description: "Reconheça e celebre conquistas dos funcionários com prêmios, destaques e eventos de apreciação",
      category: "Reconhecimento",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "6",
      name: "Eventos de Integração de Equipe",
      description: "Fortaleça os laços da equipe com atividades virtuais e presenciais, eventos sociais e desafios colaborativos",
      category: "Cultura",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "7",
      name: "Ciclo de Avaliação de Desempenho",
      description: "Oriente os funcionários através de avaliações de desempenho com lembretes, recursos e modelos de feedback",
      category: "Desempenho",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "8",
      name: "Inscrição em Benefícios",
      description: "Simplifique a seleção de benefícios com materiais educacionais, guias de comparação e prazos de inscrição",
      category: "Benefícios",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "9",
      name: "Caminho de Desenvolvimento de Carreira",
      description: "Apoie o crescimento dos funcionários com recursos de desenvolvimento de habilidades, ferramentas de planejamento de carreira e oportunidades de avanço",
      category: "Treinamento",
      content: {},
      createdAt: new Date(),
    },
  ];

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = Array.from(new Set(mockTemplates.map(t => t.category)));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Modelos de Campanha</h1>
        <p className="text-sm text-muted-foreground">
          Comece com modelos comprovados para cenários comuns de marketing de RH
        </p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar modelos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-templates"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-category-filter">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filtrar por categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Categorias</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onUse={() => console.log("Use template:", template.id)}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhum modelo encontrado</p>
        </div>
      )}
    </div>
  );
}
