// Map Types
export type MapStyle = 
  | "mapbox://styles/mapbox/streets-v12"
  | "mapbox://styles/mapbox/outdoors-v12"
  | "mapbox://styles/mapbox/light-v11"
  | "mapbox://styles/mapbox/dark-v11" 
  | "mapbox://styles/mapbox/satellite-v9"
  | "mapbox://styles/mapbox/satellite-streets-v12";

export type MapLayer = {
  id: string;
  name: string;
  visible: boolean;
};

export type MapSettings = {
  style: MapStyle;
  zoom: number;
  center: [number, number];
  pitch: number;
  bearing: number;
  layers: MapLayer[];
};

export type MapViewport = {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

// Tool types
export type MapTool = 'none' | 'measure' | 'draw' | 'geocoder';
