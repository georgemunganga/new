import { useState, useEffect } from 'react';
import { MapSettings, MapStyle, MapLayer } from '@/lib/types';

// Default map settings
const defaultSettings: MapSettings = {
  style: 'mapbox://styles/mapbox/streets-v12',
  zoom: 12.5,
  center: [-122.4194, 37.7749], // San Francisco coordinates
  pitch: 0,
  bearing: 0,
  layers: [
    { id: 'terrain', name: 'Terrain', visible: false },
    { id: 'buildings', name: '3D Buildings', visible: false },
    { id: 'traffic', name: 'Traffic', visible: false }
  ]
};

// Hook for managing map settings
export function useMapSettings() {
  const [settings, setSettings] = useState<MapSettings>(defaultSettings);
  
  // Load settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('mapSettings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Failed to load map settings:', error);
    }
  }, []);
  
  // Update settings and save to localStorage
  const updateSettings = (newSettings: Partial<MapSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    try {
      localStorage.setItem('mapSettings', JSON.stringify(updatedSettings));
    } catch (error) {
      console.error('Failed to save map settings:', error);
    }
  };
  
  // Update map style
  const updateStyle = (style: MapStyle) => {
    updateSettings({ style });
  };
  
  // Toggle layer visibility
  const toggleLayer = (layerId: string) => {
    const updatedLayers = settings.layers.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible } 
        : layer
    );
    updateSettings({ layers: updatedLayers });
  };
  
  // Update center and zoom
  const updateViewport = (center: [number, number], zoom: number) => {
    updateSettings({ center, zoom });
  };
  
  // Reset to default settings
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem('mapSettings');
  };
  
  return {
    settings,
    updateStyle,
    toggleLayer,
    updateViewport,
    resetSettings
  };
}
