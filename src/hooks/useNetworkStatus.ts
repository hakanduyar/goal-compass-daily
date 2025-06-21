
import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

export type NetworkStatus = 'online' | 'offline' | 'unknown';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>('unknown');

  useEffect(() => {
    // İlk durumu kontrol et
    NetInfo.fetch().then(state => {
      const connected = state.isConnected && state.isInternetReachable;
      setIsConnected(connected);
      setNetworkStatus(connected ? 'online' : 'offline');
      console.log('Initial network status:', connected ? 'online' : 'offline');
    });

    // Network değişikliklerini dinle
    const unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected && state.isInternetReachable;
      setIsConnected(connected);
      setNetworkStatus(connected ? 'online' : 'offline');
      console.log('Network status changed:', connected ? 'online' : 'offline');
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    isConnected,
    networkStatus,
    isOnline: isConnected === true,
    isOffline: isConnected === false
  };
};
