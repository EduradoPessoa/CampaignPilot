import { Storage } from "@google-cloud/storage";
import { randomUUID } from "crypto";

const REPLIT_SIDECAR_ENDPOINT = "http://127.0.0.1:1106";

export const objectStorageClient = new Storage({
  credentials: {
    audience: "replit",
    subject_token_type: "access_token",
    token_url: `${REPLIT_SIDECAR_ENDPOINT}/token`,
    type: "external_account",
    credential_source: {
      url: `${REPLIT_SIDECAR_ENDPOINT}/credential`,
      format: {
        type: "json",
        subject_token_field_name: "access_token",
      },
    },
    universe_domain: "googleapis.com",
  },
  projectId: "",
});

export class ObjectStorageService {
  getPrivateObjectDir(): string {
    const dir = process.env.PRIVATE_OBJECT_DIR || "";
    if (!dir) {
      throw new Error(
        "PRIVATE_OBJECT_DIR not set. Create a bucket in 'Object Storage' tool"
      );
    }
    return dir;
  }

  /**
   * Upload backup data to object storage
   */
  async uploadBackup(data: any): Promise<{ path: string; size: number }> {
    try {
      const privateDir = this.getPrivateObjectDir();
      const backupId = randomUUID();
      const fileName = `backup-${backupId}-${Date.now()}.json`;
      const fullPath = `${privateDir}/backups/${fileName}`;
      
      const { bucketName, objectName } = this.parseObjectPath(fullPath);
      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(objectName);

      const jsonData = JSON.stringify(data);
      const buffer = Buffer.from(jsonData, 'utf8');

      await file.save(buffer, {
        contentType: 'application/json',
        metadata: {
          contentType: 'application/json',
        },
      });

      return {
        path: fullPath,
        size: buffer.length,
      };
    } catch (error) {
      console.error("[ObjectStorage] Error uploading backup:", error);
      throw error;
    }
  }

  /**
   * Download backup data from object storage
   */
  async downloadBackup(path: string): Promise<any> {
    try {
      const { bucketName, objectName } = this.parseObjectPath(path);
      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(objectName);

      const [exists] = await file.exists();
      if (!exists) {
        throw new Error(`Backup file not found: ${path}`);
      }

      const [contents] = await file.download();
      return JSON.parse(contents.toString('utf8'));
    } catch (error) {
      console.error("[ObjectStorage] Error downloading backup:", error);
      throw error;
    }
  }

  /**
   * Delete backup from object storage
   */
  async deleteBackup(path: string): Promise<void> {
    try {
      const { bucketName, objectName } = this.parseObjectPath(path);
      const bucket = objectStorageClient.bucket(bucketName);
      const file = bucket.file(objectName);

      await file.delete();
    } catch (error) {
      console.error("[ObjectStorage] Error deleting backup:", error);
      throw error;
    }
  }

  private parseObjectPath(path: string): { bucketName: string; objectName: string } {
    if (!path.startsWith("/")) {
      path = `/${path}`;
    }
    const pathParts = path.split("/");
    if (pathParts.length < 3) {
      throw new Error("Invalid path: must contain at least a bucket name");
    }

    const bucketName = pathParts[1];
    const objectName = pathParts.slice(2).join("/");

    return { bucketName, objectName };
  }
}

export const objectStorageService = new ObjectStorageService();
