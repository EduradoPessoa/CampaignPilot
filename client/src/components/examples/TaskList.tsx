import { TaskList } from "../TaskList";
import { useState } from "react";

export default function TaskListExample() {
  const [tasks] = useState([
    {
      id: "1",
      campaignId: "camp1",
      title: "Design social media graphics",
      description: "Create engaging visuals for LinkedIn",
      assignee: "Sarah Chen",
      status: "pending",
      priority: "high",
      dueDate: new Date("2024-01-20"),
      createdAt: new Date(),
    },
    {
      id: "2",
      campaignId: "camp1",
      title: "Write blog post content",
      description: "Draft article about company culture",
      assignee: "Mike Johnson",
      status: "completed",
      priority: "medium",
      dueDate: new Date("2024-01-18"),
      createdAt: new Date(),
    },
    {
      id: "3",
      campaignId: "camp1",
      title: "Schedule email newsletter",
      description: "Send to all employees",
      assignee: "Lisa Park",
      status: "pending",
      priority: "low",
      dueDate: new Date("2024-01-25"),
      createdAt: new Date(),
    },
  ]);

  return (
    <div className="p-4 max-w-2xl">
      <TaskList
        tasks={tasks}
        onToggleTask={(id) => console.log("Toggle task:", id)}
      />
    </div>
  );
}
