
import React from 'react';
import { Wifi, WifiOff, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { useOfflineSync } from '@/hooks/useOfflineSync';

const NetworkStatus = () => {
  const { networkStatus } = useNetworkStatus();
  const { syncStatus, pendingCount } = useOfflineSync();

  const getStatusConfig = () => {
    if (syncStatus === 'syncing') {
      return {
        icon: Clock,
        text: 'Senkronize ediliyor...',
        bgColor: 'bg-yellow-600',
        textColor: 'text-yellow-100'
      };
    }

    if (syncStatus === 'success') {
      return {
        icon: CheckCircle,
        text: 'Senkronize edildi',
        bgColor: 'bg-green-600',
        textColor: 'text-green-100'
      };
    }

    if (syncStatus === 'error') {
      return {
        icon: AlertCircle,
        text: 'Senkronizasyon hatası',
        bgColor: 'bg-red-600',
        textColor: 'text-red-100'
      };
    }

    switch (networkStatus) {
      case 'online':
        return {
          icon: Wifi,
          text: 'Online',
          bgColor: 'bg-green-600',
          textColor: 'text-green-100'
        };
      case 'offline':
        return {
          icon: WifiOff,
          text: `Offline${pendingCount > 0 ? ` (${pendingCount} bekliyor)` : ''}`,
          bgColor: 'bg-red-600',
          textColor: 'text-red-100'
        };
      default:
        return {
          icon: Clock,
          text: 'Bağlantı kontrol ediliyor...',
          bgColor: 'bg-gray-600',
          textColor: 'text-gray-100'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  return (
    <div className={`
      fixed top-4 right-4 z-50 
      flex items-center gap-2 px-3 py-2 rounded-full 
      ${config.bgColor} ${config.textColor}
      shadow-lg backdrop-blur-sm border border-white/20
      transition-all duration-300 ease-in-out
      text-sm font-medium
    `}>
      <IconComponent className="h-4 w-4" />
      <span>{config.text}</span>
    </div>
  );
};

export default NetworkStatus;
