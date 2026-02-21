// src/services/SyncService.ts
import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'jobs';

export class SyncService {
  private static unsubscribe: (() => void) | null = null;

  static startListening() {
    this.unsubscribe = NetInfo.addEventListener(async (state: NetInfoState) => {
      const isConnected = state.isConnected && state.isInternetReachable;
      if (isConnected) {
        await this.flushCache();
      }
    });
  }

  static stopListening() {
    this.unsubscribe?.();
    this.unsubscribe = null;
  }

  // Send all cached data to the server
  static async flushCache() {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) return;

    const items = JSON.parse(raw);
    if (items.length === 0) return;

    console.log(`[SyncService] Syncing ${items.length} pending items...`);

    const failed = [];

    for (const item of items) {
      try {
        await fetch('https://your-api.com/sync', { // * Testar
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item),
        });
      } catch (e) {
        // If it fails again, keep it in cache for next attempt
        failed.push(item);
      }
    }

    // Only remove successfully sent items
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(failed));
    console.log(`[SyncService] Done. ${failed.length} items still pending.`);
  }
}