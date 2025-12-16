import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agreste.zeladoria',
  appName: 'Agreste Zeladoria',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Camera: {
      saveToGallery: true,
      allowEditing: false,
      resultType: 'uri'
    },
    Geolocation: {
      requestPermissions: true
    }
  }
};

export default config;
