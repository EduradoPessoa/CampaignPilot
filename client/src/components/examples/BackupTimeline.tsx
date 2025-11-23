import { BackupTimeline } from "../BackupTimeline";

export default function BackupTimelineExample() {
  const mockBackups = [
    {
      id: "1",
      timestamp: new Date("2024-01-20T14:30:00"),
      dataSnapshot: {},
      size: 2457600,
      type: "automatic",
    },
    {
      id: "2",
      timestamp: new Date("2024-01-19T14:30:00"),
      dataSnapshot: {},
      size: 2441200,
      type: "automatic",
    },
    {
      id: "3",
      timestamp: new Date("2024-01-18T10:15:00"),
      dataSnapshot: {},
      size: 2398400,
      type: "manual",
    },
  ];

  return (
    <div className="p-4 max-w-3xl">
      <BackupTimeline
        backups={mockBackups}
        onRestore={(id) => console.log("Restore backup:", id)}
        onDownload={(id) => console.log("Download backup:", id)}
      />
    </div>
  );
}
