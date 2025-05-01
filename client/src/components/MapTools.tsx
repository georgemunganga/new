import { Grid, PenTool, Search } from 'lucide-react';
import { MapTool } from '@/lib/types';

interface MapToolsProps {
  toggleMeasurement: () => void;
  toggleDrawing: () => void;
  toggleGeocoder: () => void;
  activeTool: MapTool;
}

export default function MapTools({ 
  toggleMeasurement, 
  toggleDrawing, 
  toggleGeocoder,
  activeTool
}: MapToolsProps) {
  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="flex flex-col space-y-2">
        <button 
          className={`p-2 rounded focus:outline-none ${activeTool === 'measure' ? 'bg-primary text-white' : 'hover:bg-light-300 text-dark-200'}`}
          onClick={toggleMeasurement}
          aria-label="Toggle measurement tool"
        >
          <Grid className="h-5 w-5" />
        </button>
        <button 
          className={`p-2 rounded focus:outline-none ${activeTool === 'draw' ? 'bg-primary text-white' : 'hover:bg-light-300 text-dark-200'}`}
          onClick={toggleDrawing}
          aria-label="Toggle drawing tools"
        >
          <PenTool className="h-5 w-5" />
        </button>
        <button 
          className={`p-2 rounded focus:outline-none ${activeTool === 'geocoder' ? 'bg-primary text-white' : 'hover:bg-light-300 text-dark-200'}`}
          onClick={toggleGeocoder}
          aria-label="Toggle geocoder search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
