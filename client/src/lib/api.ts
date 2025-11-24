import { apiRequest } from "./queryClient";
import type { Campaign, Task, Template, Backup, InsertCampaign, InsertTask, InsertTemplate, InsertBackup } from "@shared/schema";

// Campaigns
export const campaignApi = {
  getAll: () => fetch("/api/campaigns").then(res => res.json()) as Promise<Campaign[]>,
  getOne: (id: string) => fetch(`/api/campaigns/${id}`).then(res => res.json()) as Promise<Campaign>,
  create: (data: InsertCampaign) => apiRequest("POST", "/api/campaigns", data),
  update: (id: string, data: Partial<InsertCampaign>) => apiRequest("PATCH", `/api/campaigns/${id}`, data),
  delete: (id: string) => apiRequest("DELETE", `/api/campaigns/${id}`),
};

// Tasks
export const taskApi = {
  getAll: () => fetch("/api/tasks").then(res => res.json()) as Promise<Task[]>,
  getByCampaign: (campaignId: string) => fetch(`/api/tasks?campaignId=${campaignId}`).then(res => res.json()) as Promise<Task[]>,
  getOne: (id: string) => fetch(`/api/tasks/${id}`).then(res => res.json()) as Promise<Task>,
  create: (data: InsertTask) => apiRequest("POST", "/api/tasks", data),
  update: (id: string, data: Partial<InsertTask>) => apiRequest("PATCH", `/api/tasks/${id}`, data),
  delete: (id: string) => apiRequest("DELETE", `/api/tasks/${id}`),
};

// Templates
export const templateApi = {
  getAll: () => fetch("/api/templates").then(res => res.json()) as Promise<Template[]>,
  getOne: (id: string) => fetch(`/api/templates/${id}`).then(res => res.json()) as Promise<Template>,
  create: (data: InsertTemplate) => apiRequest("POST", "/api/templates", data),
  delete: (id: string) => apiRequest("DELETE", `/api/templates/${id}`),
};

// Backups
export const backupApi = {
  getAll: () => fetch("/api/backups").then(res => res.json()) as Promise<Backup[]>,
  getOne: (id: string) => fetch(`/api/backups/${id}`).then(res => res.json()) as Promise<Backup>,
  create: (data: InsertBackup) => apiRequest("POST", "/api/backups", data),
  restore: (id: string) => apiRequest("POST", `/api/backups/${id}/restore`),
  delete: (id: string) => apiRequest("DELETE", `/api/backups/${id}`),
};
