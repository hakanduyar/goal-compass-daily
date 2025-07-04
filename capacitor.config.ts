
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.goalcompass.daily',
  appName: 'goal-compass-daily',
  webDir: 'dist',
  server: {
    url: 'https://5053d500-9168-468f-8f3a-513895dbd631.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e293b',
      showSpinner: false
    }
  }
};

export default config;
