import { storage } from "./storage";
import { db } from "./db";
import { campaigns, tasks, templates, backups } from "@shared/schema";
import type { InsertBackup } from "@shared/schema";
import { objectStorageService } from "./objectStorage";

interface DataSnapshot {
  campaigns: any[];
  tasks: any[];
  templates: any[];
}

export class BackupService {
  /**
   * Create a backup of all campaign data
   */
  async createBackup(type: "automatic" | "manual" = "automatic"): Promise<void> {
    try {
      console.log(`[Backup] Starting ${type} backup...`);

      // Get all data from database
      const allCampaigns = await db.select().from(campaigns);
      const allTasks = await db.select().from(tasks);
      const allTemplates = await db.select().from(templates);

      // Create data snapshot
      const dataSnapshot: DataSnapshot = {
        campaigns: allCampaigns,
        tasks: allTasks,
        templates: allTemplates,
      };

      // Upload to object storage
      const { path, size } = await objectStorageService.uploadBackup(dataSnapshot);

      // Store only metadata in database
      const backupData: InsertBackup = {
        storagePath: path,
        size,
        type,
      };

      await storage.createBackup(backupData);

      console.log(`[Backup] ${type} backup completed successfully. Size: ${(size / 1024).toFixed(2)} KB, Path: ${path}`);
    } catch (error) {
      console.error(`[Backup] Error creating ${type} backup:`, error);
      throw error;
    }
  }

  /**
   * Download backup snapshot from object storage
   */
  async downloadBackupSnapshot(backupId: string): Promise<DataSnapshot> {
    const backup = await storage.getBackup(backupId);
    if (!backup) {
      throw new Error("Backup not found");
    }
    
    return await objectStorageService.downloadBackup(backup.storagePath);
  }

  /**
   * Restore data from a backup using a transaction
   */
  async restoreBackup(backupId: string): Promise<void> {
    try {
      console.log(`[Backup] Starting restore from backup ${backupId}...`);

      const backup = await storage.getBackup(backupId);
      if (!backup) {
        throw new Error("Backup not found");
      }

      // Download snapshot from object storage
      const snapshot = await objectStorageService.downloadBackup(backup.storagePath);
      
      // Use transaction to ensure atomic restore with correct foreign key order
      await db.transaction(async (tx) => {
        // Delete in correct order: tasks first (has FK to campaigns)
        await tx.delete(tasks);
        await tx.delete(campaigns);
        await tx.delete(templates);

        // Insert in reverse order: templates first (no dependencies), then campaigns, then tasks
        if (snapshot.templates && snapshot.templates.length > 0) {
          await tx.insert(templates).values(snapshot.templates);
        }
        
        if (snapshot.campaigns && snapshot.campaigns.length > 0) {
          await tx.insert(campaigns).values(snapshot.campaigns);
        }
        
        if (snapshot.tasks && snapshot.tasks.length > 0) {
          await tx.insert(tasks).values(snapshot.tasks);
        }
      });

      console.log(`[Backup] Restore completed successfully`);
    } catch (error) {
      console.error(`[Backup] Error restoring backup:`, error);
      throw error;
    }
  }

  /**
   * Delete old backups (retention policy)
   */
  async cleanupOldBackups(retentionDays: number = 30): Promise<void> {
    try {
      console.log(`[Backup] Cleaning up backups older than ${retentionDays} days...`);

      const allBackups = await storage.getBackups();
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

      let deletedCount = 0;
      for (const backup of allBackups) {
        const backupDate = backup.timestamp ? new Date(backup.timestamp) : null;
        if (backupDate && backupDate < cutoffDate) {
          await storage.deleteBackup(backup.id);
          deletedCount++;
        }
      }

      console.log(`[Backup] Cleanup completed. Deleted ${deletedCount} old backups`);
    } catch (error) {
      console.error(`[Backup] Error during cleanup:`, error);
      throw error;
    }
  }
}

export const backupService = new BackupService();
