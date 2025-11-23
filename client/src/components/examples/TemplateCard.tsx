import { TemplateCard } from "../TemplateCard";

export default function TemplateCardExample() {
  const mockTemplate = {
    id: "1",
    name: "New Hire Onboarding",
    description: "Welcome new employees with a comprehensive onboarding campaign",
    category: "Onboarding",
    content: {},
    createdAt: new Date(),
  };

  return (
    <div className="p-4 max-w-sm">
      <TemplateCard
        template={mockTemplate}
        onUse={() => console.log("Use template clicked")}
      />
    </div>
  );
}
