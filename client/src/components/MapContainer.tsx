import { useRef, useEffect, useState, useCallback } from 'react';
import Map, { MapRef, ViewState } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapViewport, MapStyle, MapLayer, MapTool } from '@/lib/types';
import MapControls from './MapControls';
import MapTools from './MapTools';
import CoordinateDisplay from './CoordinateDisplay';
import { Settings } from 'lucide-react';

// Get Mapbox token from environment variables
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapContainerProps {
  viewport: MapViewport;
  setViewport: (viewport: MapViewport) => void;
  mapStyle: MapStyle;
  layers: MapLayer[];
  toggleMobileControls: () => void;
  mobileControlsVisible: boolean;
}

export default function MapContainer({ 
  viewport, 
  setViewport, 
  mapStyle, 
  layers,
  toggleMobileControls,
  mobileControlsVisible
}: MapContainerProps) {
  const mapRef = useRef<MapRef>(null);
  const [activeTool, setActiveTool] = useState<MapTool>('none');
  
  // Track coordinates for display
  const [coordinates, setCoordinates] = useState({
    lat: viewport.latitude.toFixed(4),
    lng: viewport.longitude.toFixed(4),
    zoom: viewport.zoom.toFixed(1)
  });
  
  // Update coordinates on viewport change
  useEffect(() => {
    setCoordinates({
      lat: viewport.latitude.toFixed(4),
      lng: viewport.longitude.toFixed(4),
      zoom: viewport.zoom.toFixed(1)
    });
  }, [viewport]);
  
  // Map control functions
  const zoomIn = () => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.zoomIn();
    }
  };
  
  const zoomOut = () => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.zoomOut();
    }
  };
  
  const resetNorth = () => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();
      map.resetNorth();
    }
  };
  
  const toggleFullscreen = () => {
    if (mapRef.current) {
      const mapContainer = mapRef.current.getMap().getContainer();
      if (!document.fullscreenElement) {
        mapContainer.requestFullscreen?.() || 
        (mapContainer as any).webkitRequestFullscreen?.() || 
        (mapContainer as any).mozRequestFullScreen?.() || 
        (mapContainer as any).msRequestFullscreen?.();
      } else {
        document.exitFullscreen?.() || 
        (document as any).webkitExitFullscreen?.() || 
        (document as any).mozCancelFullScreen?.() || 
        (document as any).msExitFullscreen?.();
      }
    }
  };
  
  // Map tool functions
  const toggleMeasurement = () => {
    setActiveTool(activeTool === 'measure' ? 'none' : 'measure');
  };
  
  const toggleDrawing = () => {
    setActiveTool(activeTool === 'draw' ? 'none' : 'draw');
  };
  
  const toggleGeocoder = () => {
    setActiveTool(activeTool === 'geocoder' ? 'none' : 'geocoder');
  };
  
  // Handle viewport changes
  const handleMove = useCallback((evt: { viewState: ViewState }) => {
    setViewport({
      latitude: evt.viewState.latitude,
      longitude: evt.viewState.longitude,
      zoom: evt.viewState.zoom,
      bearing: evt.viewState.bearing,
      pitch: evt.viewState.pitch
    });
  }, [setViewport]);
  
  return (
    <div className="flex-1 overflow-hidden bg-light-200 relative">
      {/* Main Map Component */}
      <Map
        ref={mapRef}
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewport}
        style={{width: '100%', height: '100%'}}
        mapStyle={mapStyle}
        onMove={handleMove}
        attributionControl={false}
      >
        {/* Map layers would be added here */}
      </Map>
      
      {/* Map Tools Overlay */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <MapControls 
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          resetNorth={resetNorth}
          toggleFullscreen={toggleFullscreen}
        />
        
        <MapTools 
          toggleMeasurement={toggleMeasurement}
          toggleDrawing={toggleDrawing}
          toggleGeocoder={toggleGeocoder}
          activeTool={activeTool}
        />
      </div>
      
      {/* Coordinate Display */}
      <CoordinateDisplay 
        lat={coordinates.lat}
        lng={coordinates.lng}
        zoom={coordinates.zoom}
      />
      
      {/* Mobile Controls Toggle */}
      <div className="md:hidden absolute bottom-4 right-4">
        <button 
          className="bg-white p-3 rounded-full shadow-md text-dark-200 focus:outline-none"
          onClick={toggleMobileControls}
          aria-label="Toggle mobile controls"
        >
          <Settings className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Controls Panel - shown only when mobileControlsVisible is true */}
      {mobileControlsVisible && (
        <div className="md:hidden absolute inset-x-0 bottom-0 bg-white shadow-lg rounded-t-lg p-4 z-20">
          {/* Mobile controls content would go here */}
          <div className="space-y-4">
            <h3 className="font-medium text-dark-300">Map Controls</h3>
            {/* Mobile control options would be rendered here */}
          </div>
        </div>
      )}
    </div>
  );
}
