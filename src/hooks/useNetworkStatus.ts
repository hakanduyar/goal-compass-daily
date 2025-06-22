
import { useState, useEffect } from 'react';

export type NetworkStatus = 'online' | 'offline' | 'unknown';

export const useNetworkStatus = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(
    navigator.onLine ? true : false
  );
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(
    navigator.onLine ? 'online' : 'offline'
  );

  useEffect(() => {
    const handleOnline = () => {
      setIsConnected(true);
      setNetworkStatus('online');
      console.log('Network status changed: online');
    };

    const handleOffline = () => {
      setIsConnected(false);
      setNetworkStatus('offline');
      console.log('Network status changed: offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // İlk durumu kontrol et
    const connected = navigator.onLine;
    setIsConnected(connected);
    setNetworkStatus(connected ? 'online' : 'offline');
    console.log('Initial network status:', connected ? 'online' : 'offline');

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return {
    isConnected,
    networkStatus,
    isOnline: isConnected === true,
    isOffline: isConnected === false
  };
};
