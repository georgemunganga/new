import { useState } from 'react';
import { CircleDot } from 'lucide-react';
import { MapStyle, MapLayer } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface SidebarProps {
  mapStyle: MapStyle;
  updateMapStyle: (style: MapStyle) => void;
  layers: MapLayer[];
  toggleLayer: (layerId: string) => void;
}

export default function Sidebar({ mapStyle, updateMapStyle, layers, toggleLayer }: SidebarProps) {
  const [lastUpdated, setLastUpdated] = useState<string>('2 min ago');
  
  const handleStyleChange = (value: string) => {
    updateMapStyle(value as MapStyle);
    setLastUpdated('just now');
  };
  
  const handleLayerToggle = (layerId: string) => {
    toggleLayer(layerId);
    setLastUpdated('just now');
  };
  
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-light-400">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto bg-white">
          <div className="flex-1 px-4 space-y-4">
            <div>
              <h2 className="text-lg font-medium text-dark-300">Map Controls</h2>
              <p className="text-sm text-dark-100 mt-1">Configure map settings</p>
            </div>
            
            {/* Map Style Selector */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-dark-200">Map Style</Label>
              <Select value={mapStyle} onValueChange={handleStyleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a map style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mapbox://styles/mapbox/streets-v12">Streets</SelectItem>
                  <SelectItem value="mapbox://styles/mapbox/outdoors-v12">Outdoors</SelectItem>
                  <SelectItem value="mapbox://styles/mapbox/light-v11">Light</SelectItem>
                  <SelectItem value="mapbox://styles/mapbox/dark-v11">Dark</SelectItem>
                  <SelectItem value="mapbox://styles/mapbox/satellite-v9">Satellite</SelectItem>
                  <SelectItem value="mapbox://styles/mapbox/satellite-streets-v12">Satellite Streets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Map Layers Toggle */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-dark-200">Layers</Label>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <div key={layer.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`layer-${layer.id}`} 
                      checked={layer.visible}
                      onCheckedChange={() => handleLayerToggle(layer.id)}
                    />
                    <Label 
                      htmlFor={`layer-${layer.id}`}
                      className="text-sm text-dark-200"
                    >
                      {layer.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* API Status Indicator */}
            <div className="pt-4 border-t border-light-400">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <CircleDot className="h-4 w-4 text-green-500" />
                </div>
                <div className="ml-2">
                  <p className="text-sm text-dark-200">API Connected</p>
                  <p className="text-xs text-dark-100">Last updated: <span>{lastUpdated}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
