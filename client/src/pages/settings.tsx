import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Bell, Mail, Shield, User } from "lucide-react";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Configurações</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie sua conta e preferências do aplicativo
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Perfil
            </CardTitle>
            <CardDescription>Atualize suas informações pessoais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input id="name" placeholder="João Silva" defaultValue="Sarah Chen" data-testid="input-name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input id="email" type="email" placeholder="email@exemplo.com" defaultValue="sarah.chen@empresa.com" data-testid="input-email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Input id="role" placeholder="Gerente de RH" defaultValue="Gerente de Marketing de RH" data-testid="input-role" />
            </div>
            <Button data-testid="button-save-profile">Salvar Alterações</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>Configure como você recebe atualizações</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="email-notifications">Notificações por E-mail</Label>
                <p className="text-sm text-muted-foreground">Receber atualizações de campanha por e-mail</p>
              </div>
              <Switch id="email-notifications" defaultChecked data-testid="switch-email-notifications" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="task-reminders">Lembretes de Tarefas</Label>
                <p className="text-sm text-muted-foreground">Receber lembretes sobre prazos futuros</p>
              </div>
              <Switch id="task-reminders" defaultChecked data-testid="switch-task-reminders" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weekly-reports">Relatórios Semanais</Label>
                <p className="text-sm text-muted-foreground">Receber resumos semanais de desempenho</p>
              </div>
              <Switch id="weekly-reports" data-testid="switch-weekly-reports" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="backup-alerts">Alertas de Backup</Label>
                <p className="text-sm text-muted-foreground">Notificações quando backups forem concluídos</p>
              </div>
              <Switch id="backup-alerts" defaultChecked data-testid="switch-backup-alerts" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Preferências de E-mail
            </CardTitle>
            <CardDescription>Gerencie configurações de comunicação por e-mail</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notification-email">E-mail de Notificação</Label>
              <Input id="notification-email" type="email" placeholder="notificacoes@empresa.com" data-testid="input-notification-email" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="digest-emails">Resumo Diário</Label>
                <p className="text-sm text-muted-foreground">Combinar atualizações em resumo diário</p>
              </div>
              <Switch id="digest-emails" data-testid="switch-digest-emails" />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing-emails">Atualizações de Marketing</Label>
                <p className="text-sm text-muted-foreground">Novidades de produtos e atualizações de recursos</p>
              </div>
              <Switch id="marketing-emails" defaultChecked data-testid="switch-marketing-emails" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança
            </CardTitle>
            <CardDescription>Gerencie suas configurações de segurança</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Senha</Label>
              <Button variant="outline" className="w-full" data-testid="button-change-password">
                Alterar Senha
              </Button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="two-factor">Autenticação de Dois Fatores</Label>
                <p className="text-sm text-muted-foreground">Adicionar segurança extra à sua conta</p>
              </div>
              <Switch id="two-factor" data-testid="switch-two-factor" />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Gerenciamento de Sessão</Label>
              <Button variant="outline" className="w-full" data-testid="button-sign-out-devices">
                Sair de Todos os Dispositivos
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
