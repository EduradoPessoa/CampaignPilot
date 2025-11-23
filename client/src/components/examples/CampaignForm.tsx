import { CampaignForm } from "../CampaignForm";

export default function CampaignFormExample() {
  return (
    <div className="p-4 max-w-2xl">
      <CampaignForm
        onSubmit={(data) => console.log("Form submitted:", data)}
      />
    </div>
  );
}
