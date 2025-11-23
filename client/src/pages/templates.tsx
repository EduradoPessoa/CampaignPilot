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
      name: "New Hire Onboarding",
      description: "Welcome new employees with a comprehensive onboarding campaign that includes orientation, training schedules, and team introductions",
      category: "Onboarding",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Employee Wellness Program",
      description: "Promote health and wellness initiatives including fitness challenges, mental health resources, and healthy lifestyle tips",
      category: "Wellness",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "Diversity & Inclusion Initiative",
      description: "Celebrate diversity and promote inclusive culture with awareness campaigns, employee stories, and educational content",
      category: "Culture",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "4",
      name: "Leadership Development",
      description: "Nurture future leaders with training programs, mentorship opportunities, and leadership workshops",
      category: "Training",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "5",
      name: "Employee Recognition",
      description: "Acknowledge and celebrate employee achievements with awards, spotlights, and appreciation events",
      category: "Recognition",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "6",
      name: "Team Building Events",
      description: "Strengthen team bonds with virtual and in-person activities, social events, and collaborative challenges",
      category: "Culture",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "7",
      name: "Performance Review Cycle",
      description: "Guide employees through performance evaluations with reminders, resources, and feedback templates",
      category: "Performance",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "8",
      name: "Benefits Enrollment",
      description: "Simplify benefits selection with educational materials, comparison guides, and enrollment deadlines",
      category: "Benefits",
      content: {},
      createdAt: new Date(),
    },
    {
      id: "9",
      name: "Career Development Path",
      description: "Support employee growth with skill-building resources, career planning tools, and advancement opportunities",
      category: "Training",
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
        <h1 className="text-2xl font-semibold">Campaign Templates</h1>
        <p className="text-sm text-muted-foreground">
          Start with proven templates for common HR marketing scenarios
        </p>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-templates"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]" data-testid="select-category-filter">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
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
          <p className="text-muted-foreground">No templates found</p>
        </div>
      )}
    </div>
  );
}
