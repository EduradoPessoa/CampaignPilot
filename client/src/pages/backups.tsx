import { useState } from "react";
import { BackupTimeline } from "@/components/BackupTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Download, Settings, Clock, HardDrive } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { Backup } from "@shared/schema";

export default function Backups() {
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [selectedBackupId, setSelectedBackupId] = useState<string | null>(null);

  const mockBackups: Backup[] = [
    {
      id: "1",
      timestamp: new Date("2024-01-22T14:30:00"),
      dataSnapshot: {},
      size: 2457600,
      type: "automatic",
    },
    {
      id: "2",
      timestamp: new Date("2024-01-21T14:30:00"),
      dataSnapshot: {},
      size: 2441200,
      type: "automatic",
    },
    {
      id: "3",
      timestamp: new Date("2024-01-20T10:15:00"),
      dataSnapshot: {},
      size: 2398400,
      type: "manual",
    },
    {
      id: "4",
      timestamp: new Date("2024-01-19T14:30:00"),
      dataSnapshot: {},
      size: 2385900,
      type: "automatic",
    },
    {
      id: "5",
      timestamp: new Date("2024-01-18T14:30:00"),
      dataSnapshot: {},
      size: 2372100,
      type: "automatic",
    },
  ];

  const handleRestore = (backupId: string) => {
    setSelectedBackupId(backupId);
    setRestoreDialogOpen(true);
  };

  const confirmRestore = () => {
    console.log("Restoring backup:", selectedBackupId);
    setRestoreDialogOpen(false);
    setSelectedBackupId(null);
  };

  const handleDownload = (backupId: string) => {
    console.log("Downloading backup:", backupId);
  };

  const handleCreateBackup = () => {
    console.log("Creating manual backup");
  };

  const totalSize = mockBackups.reduce((sum, backup) => sum + (backup.size || 0), 0);
  const formatBytes = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Backup & Recovery</h1>
          <p className="text-sm text-muted-foreground">
            Automated backups ensure your campaign data is always safe
          </p>
        </div>
        <Button onClick={handleCreateBackup} data-testid="button-create-backup">
          <Database className="h-4 w-4 mr-2" />
          Create Manual Backup
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Backups</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{mockBackups.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockBackups.filter(b => b.type === "automatic").length} automatic
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatBytes(totalSize)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across all backups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Backup</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">14:30</div>
            <p className="text-xs text-muted-foreground mt-1">
              Daily at 2:30 PM
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BackupTimeline
            backups={mockBackups}
            onRestore={handleRestore}
            onDownload={handleDownload}
          />
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Backup Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Automatic Backups</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">
                    Enabled
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Daily backups at 2:30 PM
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Retention Period</span>
                  <span className="text-sm text-muted-foreground">30 days</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Backups older than 30 days are automatically deleted
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Backup Scope</span>
                  <span className="text-sm text-muted-foreground">Full</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  All campaigns, tasks, and settings included
                </p>
              </div>

              <Button variant="outline" className="w-full" data-testid="button-configure-backups">
                <Settings className="h-4 w-4 mr-2" />
                Configure Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restore from Backup</AlertDialogTitle>
            <AlertDialogDescription>
              This will restore all campaign data to the selected backup point. Any changes made after this backup will be lost. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-restore">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRestore} data-testid="button-confirm-restore">
              Restore Backup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
