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
          <h1 className="text-2xl font-semibold">Backup e Recuperação</h1>
          <p className="text-sm text-muted-foreground">
            Backups automáticos garantem que seus dados de campanha estejam sempre seguros
          </p>
        </div>
        <Button onClick={handleCreateBackup} data-testid="button-create-backup">
          <Database className="h-4 w-4 mr-2" />
          Criar Backup Manual
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Backups</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{mockBackups.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {mockBackups.filter(b => b.type === "automatic").length} automáticos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Armazenamento Total</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{formatBytes(totalSize)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Em todos os backups
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Próximo Backup</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">14:30</div>
            <p className="text-xs text-muted-foreground mt-1">
              Diariamente às 14:30
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
                Configurações de Backup
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Backups Automáticos</span>
                  <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400">
                    Ativado
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Backups diários às 14:30
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Período de Retenção</span>
                  <span className="text-sm text-muted-foreground">30 dias</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Backups com mais de 30 dias são excluídos automaticamente
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Escopo do Backup</span>
                  <span className="text-sm text-muted-foreground">Completo</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Todas as campanhas, tarefas e configurações incluídas
                </p>
              </div>

              <Button variant="outline" className="w-full" data-testid="button-configure-backups">
                <Settings className="h-4 w-4 mr-2" />
                Configurar Definições
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={restoreDialogOpen} onOpenChange={setRestoreDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Restaurar do Backup</AlertDialogTitle>
            <AlertDialogDescription>
              Isto irá restaurar todos os dados da campanha para o ponto de backup selecionado. Quaisquer alterações feitas após este backup serão perdidas. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="button-cancel-restore">Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRestore} data-testid="button-confirm-restore">
              Restaurar Backup
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
