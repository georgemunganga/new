interface CoordinateDisplayProps {
  lat: string;
  lng: string;
  zoom: string;
}

export default function CoordinateDisplay({ lat, lng, zoom }: CoordinateDisplayProps) {
  return (
    <div className="absolute bottom-4 left-4 bg-white rounded-md shadow-md px-3 py-2 text-sm text-dark-200">
      <div className="flex items-center space-x-4">
        <div>
          <span className="font-medium">Lat:</span> <span>{lat}</span>
        </div>
        <div>
          <span className="font-medium">Lng:</span> <span>{lng}</span>
        </div>
        <div>
          <span className="font-medium">Zoom:</span> <span>{zoom}</span>
        </div>
      </div>
    </div>
  );
}
