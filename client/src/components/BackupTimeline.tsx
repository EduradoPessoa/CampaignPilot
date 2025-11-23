import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Download, RotateCcw } from "lucide-react";
import type { Backup } from "@shared/schema";

interface BackupTimelineProps {
  backups: Backup[];
  onRestore?: (backupId: string) => void;
  onDownload?: (backupId: string) => void;
}

export function BackupTimeline({ backups, onRestore, onDownload }: BackupTimelineProps) {
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5" />
          Backup History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {backups.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No backups yet</p>
          ) : (
            backups.map((backup, index) => (
              <div
                key={backup.id}
                className="flex items-center gap-4 p-4 rounded-md border hover-elevate"
                data-testid={`backup-item-${backup.id}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Database className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-sm">
                      {new Date(backup.timestamp!).toLocaleString()}
                    </p>
                    <Badge variant="outline">{backup.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Size: {formatBytes(backup.size || 0)} • Backup #{backups.length - index}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDownload?.(backup.id)}
                    data-testid={`button-download-${backup.id}`}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onRestore?.(backup.id)}
                    data-testid={`button-restore-${backup.id}`}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Restore
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
