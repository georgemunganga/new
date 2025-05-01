import { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import MapContainer from '@/components/MapContainer';
import { MapViewport, MapStyle, MapLayer } from '@/lib/types';

export default function Home() {
  // Map state
  const [viewport, setViewport] = useState<MapViewport>({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 12.5,
    bearing: 0,
    pitch: 0
  });
  
  const [mapStyle, setMapStyle] = useState<MapStyle>(
    'mapbox://styles/mapbox/streets-v12'
  );
  
  const [layers, setLayers] = useState<MapLayer[]>([
    { id: 'terrain', name: 'Terrain', visible: false },
    { id: 'buildings', name: '3D Buildings', visible: false },
    { id: 'traffic', name: 'Traffic', visible: false }
  ]);
  
  // Settings panel visibility
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [userMenuVisible, setUserMenuVisible] = useState(false);
  const [mobileControlsVisible, setMobileControlsVisible] = useState(false);
  
  // Toggle layer visibility
  const toggleLayer = (layerId: string) => {
    setLayers(layers.map(layer => 
      layer.id === layerId 
        ? { ...layer, visible: !layer.visible } 
        : layer
    ));
  };
  
  // Update map style
  const updateMapStyle = (style: MapStyle) => {
    setMapStyle(style);
  };
  
  // Toggle settings visibility
  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };
  
  // Toggle user menu
  const toggleUserMenu = () => {
    setUserMenuVisible(!userMenuVisible);
  };
  
  // Toggle mobile controls
  const toggleMobileControls = () => {
    setMobileControlsVisible(!mobileControlsVisible);
  };
  
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <Header 
        toggleSettings={toggleSettings} 
        toggleUserMenu={toggleUserMenu} 
      />
      
      <main className="flex-1 flex overflow-hidden">
        {/* Sidebar for map controls */}
        <Sidebar 
          mapStyle={mapStyle} 
          updateMapStyle={updateMapStyle}
          layers={layers}
          toggleLayer={toggleLayer}
        />
        
        {/* Map container */}
        <MapContainer 
          viewport={viewport}
          setViewport={setViewport}
          mapStyle={mapStyle}
          layers={layers}
          toggleMobileControls={toggleMobileControls}
          mobileControlsVisible={mobileControlsVisible}
        />
      </main>
    </div>
  );
}
