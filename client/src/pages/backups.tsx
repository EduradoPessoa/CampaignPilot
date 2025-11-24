import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { BackupTimeline } from "@/components/BackupTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Database, Settings, Clock, HardDrive } from "lucide-react";
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
import { backupApi } from "@/lib/api";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Backups() {
  const [restoreDialogOpen, setRestoreDialogOpen] = useState(false);
  const [selectedBackupId, setSelectedBackupId] = useState<string | null>(null);
  const { toast } = useToast();

  const { data: backups = [], isLoading } = useQuery({
    queryKey: ["/api/backups"],
    queryFn: backupApi.getAll,
  });

  const createBackupMutation = useMutation({
    mutationFn: async () => {
      // Backend will create backup with actual data snapshot
      return fetch("/api/backups/create-manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }).then(res => {
        if (!res.ok) throw new Error("Failed to create backup");
        return res.json();
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/backups"] });
      toast({
        title: "Backup criado",
        description: "O backup manual foi criado com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar o backup.",
        variant: "destructive",
      });
    },
  });

  const restoreMutation = useMutation({
    mutationFn: backupApi.restore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/campaigns"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tasks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/templates"] });
      toast({
        title: "Restauração concluída",
        description: "Os dados foram restaurados com sucesso.",
      });
      setRestoreDialogOpen(false);
      setSelectedBackupId(null);
    },
    onError: (error: any) => {
      toast({
        title: "Erro na restauração",
        description: error.message || "Não foi possível restaurar o backup.",
        variant: "destructive",
      });
    },
  });

  const handleRestore = (backupId: string) => {
    setSelectedBackupId(backupId);
    setRestoreDialogOpen(true);
  };

  const confirmRestore = () => {
    if (selectedBackupId) {
      restoreMutation.mutate(selectedBackupId);
    }
  };

  const handleDownload = async (backupId: string) => {
    try {
      const response = await fetch(`/api/backups/${backupId}/download`);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `backup-${backupId}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download concluído",
        description: "O backup foi baixado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Não foi possível baixar o backup.",
        variant: "destructive",
      });
    }
  };

  const handleCreateBackup = () => {
    createBackupMutation.mutate();
  };

  const totalSize = backups.reduce((sum, backup) => sum + (backup.size || 0), 0);
  const formatBytes = (bytes: number) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Carregando backups...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold">Backup e Recuperação</h1>
          <p className="text-sm text-muted-foreground">
            Backups automáticos garantem que seus dados de campanha estejam sempre seguros
          </p>
        </div>
        <Button 
          onClick={handleCreateBackup} 
          disabled={createBackupMutation.isPending}
          data-testid="button-create-backup"
        >
          <Database className="h-4 w-4 mr-2" />
          {createBackupMutation.isPending ? "Criando..." : "Criar Backup Manual"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Backups</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-semibold">{backups.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {backups.filter(b => b.type === "automatic").length} automáticos
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
            backups={backups}
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
            <AlertDialogAction 
              onClick={confirmRestore} 
              disabled={restoreMutation.isPending}
              data-testid="button-confirm-restore"
            >
              {restoreMutation.isPending ? "Restaurando..." : "Restaurar Backup"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
