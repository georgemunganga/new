import { Plus, Minus, Compass, Maximize } from 'lucide-react';

interface MapControlsProps {
  zoomIn: () => void;
  zoomOut: () => void;
  resetNorth: () => void;
  toggleFullscreen: () => void;
}

export default function MapControls({ 
  zoomIn, 
  zoomOut, 
  resetNorth, 
  toggleFullscreen 
}: MapControlsProps) {
  return (
    <div className="bg-white p-2 rounded-md shadow-md">
      <div className="flex flex-col space-y-2">
        <button 
          className="p-2 hover:bg-light-300 rounded focus:outline-none text-dark-200"
          onClick={zoomIn}
          aria-label="Zoom in"
        >
          <Plus className="h-5 w-5" />
        </button>
        <button 
          className="p-2 hover:bg-light-300 rounded focus:outline-none text-dark-200"
          onClick={zoomOut}
          aria-label="Zoom out"
        >
          <Minus className="h-5 w-5" />
        </button>
        <div className="border-t border-light-400"></div>
        <button 
          className="p-2 hover:bg-light-300 rounded focus:outline-none text-dark-200"
          onClick={resetNorth}
          aria-label="Reset north"
        >
          <Compass className="h-5 w-5" />
        </button>
        <button 
          className="p-2 hover:bg-light-300 rounded focus:outline-none text-dark-200"
          onClick={toggleFullscreen}
          aria-label="Toggle fullscreen"
        >
          <Maximize className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
