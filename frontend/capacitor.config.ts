import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agreste.zeladoria',
  appName: 'Recanto do Agreste',
  webDir: '.next/static',
  server: {
    url: 'https://agreste-zeladoria.vercel.app',
    cleartext: false
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
