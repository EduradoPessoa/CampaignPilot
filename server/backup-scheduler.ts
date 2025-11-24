import { backupService } from "./backup-service";

export class BackupScheduler {
  private intervalId: NodeJS.Timeout | null = null;
  private readonly BACKUP_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
  private readonly CLEANUP_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

  /**
   * Start the automatic backup scheduler
   */
  start(): void {
    if (this.intervalId) {
      console.log("[Scheduler] Backup scheduler is already running");
      return;
    }

    console.log("[Scheduler] Starting automatic backup scheduler");
    
    // Run initial backup after 1 minute
    setTimeout(() => {
      this.runScheduledBackup();
    }, 60 * 1000);

    // Schedule daily backups
    this.intervalId = setInterval(() => {
      this.runScheduledBackup();
    }, this.BACKUP_INTERVAL_MS);

    // Schedule weekly cleanup
    setInterval(() => {
      this.runCleanup();
    }, this.CLEANUP_INTERVAL_MS);

    console.log("[Scheduler] Scheduler started successfully");
  }

  /**
   * Stop the automatic backup scheduler
   */
  stop(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log("[Scheduler] Backup scheduler stopped");
    }
  }

  /**
   * Run a scheduled backup
   */
  private async runScheduledBackup(): Promise<void> {
    try {
      console.log("[Scheduler] Running scheduled backup...");
      await backupService.createBackup("automatic");
      console.log("[Scheduler] Scheduled backup completed");
    } catch (error) {
      console.error("[Scheduler] Error during scheduled backup:", error);
    }
  }

  /**
   * Run cleanup of old backups
   */
  private async runCleanup(): Promise<void> {
    try {
      console.log("[Scheduler] Running backup cleanup...");
      await backupService.cleanupOldBackups(30); // 30 days retention
      console.log("[Scheduler] Cleanup completed");
    } catch (error) {
      console.error("[Scheduler] Error during cleanup:", error);
    }
  }

  /**
   * Force an immediate backup (for testing)
   */
  async forceBackup(): Promise<void> {
    await this.runScheduledBackup();
  }
}

export const backupScheduler = new BackupScheduler();
