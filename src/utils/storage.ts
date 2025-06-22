
import { ProgramDay } from './programData';

const STORAGE_KEYS = {
  PROGRAM_DATA: 'program_data',
  PENDING_SYNC: 'pending_sync',
  LAST_SYNC: 'last_sync'
};

export interface PendingSyncItem {
  id: string;
  action: 'create' | 'update' | 'delete';
  data: any;
  timestamp: number;
  dayIndex?: number;
}

export class StorageManager {
  // Program verilerini yerel olarak kaydet
  static async saveProgramData(data: ProgramDay[]): Promise<void> {
    try {
      const jsonData = JSON.stringify(data);
      localStorage.setItem(STORAGE_KEYS.PROGRAM_DATA, jsonData);
      console.log('Program data saved locally:', data.length, 'items');
    } catch (error) {
      console.error('Error saving program data:', error);
      throw error;
    }
  }

  // Program verilerini yerel olarak yükle
  static async loadProgramData(): Promise<ProgramDay[] | null> {
    try {
      const jsonData = localStorage.getItem(STORAGE_KEYS.PROGRAM_DATA);
      if (jsonData) {
        const data = JSON.parse(jsonData);
        console.log('Program data loaded locally:', data.length, 'items');
        return data;
      }
      return null;
    } catch (error) {
      console.error('Error loading program data:', error);
      return null;
    }
  }

  // Senkronizasyon bekleyen öğeleri kaydet
  static async addPendingSync(item: PendingSyncItem): Promise<void> {
    try {
      const existing = await this.getPendingSync();
      const updated = [...existing, item];
      localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(updated));
      console.log('Added pending sync item:', item);
    } catch (error) {
      console.error('Error adding pending sync:', error);
    }
  }

  // Senkronizasyon bekleyen öğeleri getir
  static async getPendingSync(): Promise<PendingSyncItem[]> {
    try {
      const jsonData = localStorage.getItem(STORAGE_KEYS.PENDING_SYNC);
      return jsonData ? JSON.parse(jsonData) : [];
    } catch (error) {
      console.error('Error getting pending sync:', error);
      return [];
    }
  }

  // Senkronizasyon bekleyen öğeleri temizle
  static async clearPendingSync(): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify([]));
      console.log('Pending sync cleared');
    } catch (error) {
      console.error('Error clearing pending sync:', error);
    }
  }

  // Son senkronizasyon zamanını kaydet
  static async setLastSync(timestamp: number): Promise<void> {
    try {
      localStorage.setItem(STORAGE_KEYS.LAST_SYNC, timestamp.toString());
    } catch (error) {
      console.error('Error setting last sync:', error);
    }
  }

  // Son senkronizasyon zamanını getir
  static async getLastSync(): Promise<number | null> {
    try {
      const timestamp = localStorage.getItem(STORAGE_KEYS.LAST_SYNC);
      return timestamp ? parseInt(timestamp) : null;
    } catch (error) {
      console.error('Error getting last sync:', error);
      return null;
    }
  }

  // Tüm verileri temizle (debug için)
  static async clearAll(): Promise<void> {
    try {
      localStorage.removeItem(STORAGE_KEYS.PROGRAM_DATA);
      localStorage.removeItem(STORAGE_KEYS.PENDING_SYNC);
      localStorage.removeItem(STORAGE_KEYS.LAST_SYNC);
      console.log('All storage cleared');
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }
}
