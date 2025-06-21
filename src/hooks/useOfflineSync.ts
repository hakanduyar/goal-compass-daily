
import { useState, useEffect, useCallback } from 'react';
import { useNetworkStatus } from './useNetworkStatus';
import { StorageManager, PendingSyncItem } from '../utils/storage';
import { ProgramDay } from '../utils/programData';

export type SyncStatus = 'idle' | 'syncing' | 'error' | 'success';

export const useOfflineSync = () => {
  const { isOnline } = useNetworkStatus();
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [pendingCount, setPendingCount] = useState(0);

  // Bekleyen senkronizasyon sayısını güncelle
  const updatePendingCount = useCallback(async () => {
    const pending = await StorageManager.getPendingSync();
    setPendingCount(pending.length);
  }, []);

  // Veri kaydetme (offline destekli)
  const saveData = useCallback(async (
    data: ProgramDay[],
    dayIndex?: number,
    action: 'create' | 'update' | 'delete' = 'update'
  ) => {
    try {
      // Her zaman yerel olarak kaydet
      await StorageManager.saveProgramData(data);
      
      if (isOnline) {
        // Online ise Supabase'e de kaydet (şimdilik sadece log)
        console.log('Would sync to Supabase:', { action, dayIndex });
        // TODO: Supabase entegrasyonu eklenecek
      } else {
        // Offline ise senkronizasyon kuyruğuna ekle
        const pendingItem: PendingSyncItem = {
          id: Date.now().toString(),
          action,
          data: dayIndex !== undefined ? data[dayIndex] : data,
          timestamp: Date.now(),
          dayIndex
        };
        await StorageManager.addPendingSync(pendingItem);
        console.log('Added to pending sync queue');
      }
      
      await updatePendingCount();
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  }, [isOnline, updatePendingCount]);

  // Bekleyen verileri senkronize et
  const syncPendingData = useCallback(async () => {
    if (!isOnline) return;

    const pending = await StorageManager.getPendingSync();
    if (pending.length === 0) return;

    setSyncStatus('syncing');
    console.log('Starting sync of', pending.length, 'items');

    try {
      // TODO: Burada Supabase'e senkronizasyon yapılacak
      for (const item of pending) {
        console.log('Syncing item:', item);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      await StorageManager.clearPendingSync();
      await StorageManager.setLastSync(Date.now());
      setSyncStatus('success');
      await updatePendingCount();
      
      console.log('Sync completed successfully');
      
      // Success durumunu 2 saniye sonra temizle
      setTimeout(() => setSyncStatus('idle'), 2000);
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
      
      // Error durumunu 3 saniye sonra temizle
      setTimeout(() => setSyncStatus('idle'), 3000);
    }
  }, [isOnline, updatePendingCount]);

  // Online olduğunda otomatik senkronizasyon
  useEffect(() => {
    if (isOnline && pendingCount > 0) {
      console.log('Coming online, starting auto-sync');
      syncPendingData();
    }
  }, [isOnline, pendingCount, syncPendingData]);

  // Başlangıçta pending count'u yükle
  useEffect(() => {
    updatePendingCount();
  }, [updatePendingCount]);

  return {
    saveData,
    syncPendingData,
    syncStatus,
    pendingCount,
    isOnline
  };
};
