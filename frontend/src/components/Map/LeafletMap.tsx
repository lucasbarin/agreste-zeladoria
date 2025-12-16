'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix para ícones do Leaflet com Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  center: [number, number];
  zoom?: number;
  height?: string;
  onLocationSelect?: (lat: number, lng: number) => void;
  markers?: Array<{
    id: string;
    position: [number, number];
    popup?: string;
    color?: string; // Hex color code
    icon?: string; // Icon name
  }>;
  draggableMarker?: boolean;
}

export default function LeafletMap({
  center,
  zoom = 15,
  height = '400px',
  onLocationSelect,
  markers = [],
  draggableMarker = false,
}: MapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Inicializar mapa
    const map = L.map(containerRef.current).setView(center, zoom);

    // Adicionar camada do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    mapRef.current = map;

    // Adicionar marcador arrastável
    if (draggableMarker) {
      const marker = L.marker(center, { draggable: true }).addTo(map);
      markerRef.current = marker;

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        if (onLocationSelect) {
          onLocationSelect(pos.lat, pos.lng);
        }
      });
    }

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Criar ícone colorido personalizado com ícone Phosphor
  const createColoredIcon = (color?: string, iconName?: string) => {
    const markerColor = color || '#dc3545'; // Vermelho padrão
    
    // Mapeamento de ícones comuns para seus paths SVG (24x24)
    const iconPaths: { [key: string]: string } = {
      'lightbulb': 'M12 2a6 6 0 0 1 4 10.472V18a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-5.528A6 6 0 0 1 12 2zm0 2a4 4 0 0 0-2.646 7l.646.6V18h4v-6.4l.646-.6A4 4 0 0 0 12 4zm-1 16h2v2h-2v-2z',
      'warning': 'M12 2L1 21h22L12 2zm0 4.5l8.5 14.5h-17L12 6.5zM11 12v4h2v-4h-2zm0 6v2h2v-2h-2z',
      'trash': 'M7 4V2h10v2h5v2h-2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6H2V4h5zm2 4v10h2V8H9zm4 0v10h2V8h-2z',
      'drop': 'M12 2c-1.5 2.5-6 7-6 10a6 6 0 1 0 12 0c0-3-4.5-7.5-6-10zm0 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z',
      'tree': 'M12 2l4 8h-3v4h3l-4 8-4-8h3v-4H8l4-8z',
      'road-horizon': 'M2 12h5l1-4h8l1 4h5L20 8H4l-2 4zm0 2l2 4h16l2-4H2z',
      'phone': 'M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.28-.28.67-.36 1.02-.24 1.12.37 2.32.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z',
      'toolbox': 'M20 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v2H2v12h20V8h-2zm-2-2v2H6V6h12zM4 10h16v8H4v-8z',
      'wrench': 'M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z',
      'first-aid': 'M20 6h-3V4c0-1.1-.9-2-2-2H9c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-5-2v2H9V4h6zm-4 10h-2v2H7v-2H5v-2h2v-2h2v2h2v2z'
    };
    
    const iconPath = iconName && iconPaths[iconName] ? iconPaths[iconName] : '';
    
    return L.divIcon({
      html: `
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="18" fill="${markerColor}" stroke="#fff" stroke-width="3"/>
          ${iconPath ? `
          <g transform="translate(8, 8)">
            <path d="${iconPath}" fill="#fff" stroke="none"/>
          </g>` : ''}
        </svg>
      `,
      className: 'custom-marker',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -40]
    });
  };

  // Atualizar marcadores
  useEffect(() => {
    if (!mapRef.current) return;

    // Limpar marcadores anteriores (exceto o arrastável)
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker && layer !== markerRef.current) {
        mapRef.current!.removeLayer(layer);
      }
    });

    // Adicionar novos marcadores
    markers.forEach((markerData) => {
      const icon = createColoredIcon(markerData.color, markerData.icon);
      const marker = L.marker(markerData.position, { icon }).addTo(mapRef.current!);
      
      if (markerData.popup) {
        marker.bindPopup(markerData.popup);
      }
    });
  }, [markers]);

  // Atualizar centro
  useEffect(() => {
    if (mapRef.current && draggableMarker && markerRef.current) {
      mapRef.current.setView(center, zoom);
      markerRef.current.setLatLng(center);
    }
  }, [center, zoom, draggableMarker]);

  return (
    <div
      ref={containerRef}
      style={{ height, width: '100%', borderRadius: '8px' }}
      className="leaflet-container"
    />
  );
}
