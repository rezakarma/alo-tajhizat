"use client";
import dynamic from "next/dynamic";

// import {
//   LayersControl,
//   MapContainer,
//   Marker,
//   Popup,
//   TileLayer,
//   useMap,
//   useMapEvents,
// } from "react-leaflet";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const useMapEvents = dynamic(
  () => import("react-leaflet").then((mod) => mod.useMapEvents),
  { ssr: false }
);

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { Button } from "@nextui-org/react";
import SelfLocationFinder from "./selfLocationFinder";
const MapView = ({
  showOnly = false,
  selectedLocation,
  setSelectedLocation,
  width = 200,
  height = 140,
}) => {
  const handleMapClick = (location) => {
    if (showOnly) {
      return;
    }
    setSelectedLocation(location);
  };

  const defaultIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl:
      "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconSize: [20, 30], // adjust the size of the icon
    iconAnchor: [10, 30], // adjust the anchor point to the bottom of the icon
    popupAnchor: [0, -30], // adjust the popup anchor point
  });

  return (
    <div
      className={`w-[${width}px] h-[${height}px] rounded-md border border-gray-200`}
    >
      <MapContainer
        style={{ zIndex: 1 }}
        center={
          selectedLocation
            ? [selectedLocation.lat, selectedLocation.lng]
            : [32, 53]
        }
        zoom={selectedLocation ? 14 : 5}
        className="reletive"
        pointerEvents={true}
        scrollWheelZoom={!showOnly}
        zoomControl={!showOnly}
        dragging={!showOnly}
        doubleClickZoom={!showOnly}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {selectedLocation && (
          <Marker
            icon={defaultIcon}
            position={[selectedLocation.lat, selectedLocation.lng]}
          />
        )}
        {!showOnly && <MapEvents onMapClick={handleMapClick} />}
        {/* <MinimapControl position="topright" /> */}
        {!showOnly && <SelfLocationFinder setPosition={setSelectedLocation} />}
      </MapContainer>
    </div>
  );
};

export default MapView;

const MapEvents = ({ onMapClick }) => {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      console.log(e.latlng);
      onMapClick(e.latlng);
    },
  });

  return null;
};

// Classes used by Leaflet to position controls
// const POSITION_CLASSES = {
//   bottomleft: "leaflet-bottom leaflet-left",
//   bottomright: "leaflet-bottom leaflet-right",
//   topleft: "leaflet-top leaflet-left",
//   topright: "leaflet-top leaflet-right",
// };

// const BOUNDS_STYLE = { weight: 1 };

// function MinimapBounds({ parentMap, zoom }) {
//   const minimap = useMap()

//   // Clicking a point on the minimap sets the parent's map center
//   const onClick = useCallback(
//     (e) => {
//       parentMap.setView(e.latlng, parentMap.getZoom())
//     },
//     [parentMap],
//   )
//   useMapEvent('click', onClick)

//   // Keep track of bounds in state to trigger renders
//   const [bounds, setBounds] = useState(parentMap.getBounds())
//   const onChange = useCallback(() => {
//     setBounds(parentMap.getBounds())
//     // Update the minimap's view to match the parent map's center and zoom
//     minimap.setView(parentMap.getCenter(), zoom)
//   }, [minimap, parentMap, zoom])

//   // Listen to events on the parent map
//   const handlers = useMemo(() => ({ move: onChange, zoom: onChange }), [])
//   useEventHandlers({ instance: parentMap }, handlers)

//   return <Rectangle bounds={bounds} pathOptions={BOUNDS_STYLE} />
// }

// function MinimapControl({ position, zoom }) {
//   const parentMap = useMap();
//   const mapZoom = zoom || 0;

// Memoize the minimap so it's not affected by position changes
// const minimap = useMemo(
//   () => (
//     <MapContainer
//       style={{ height: 80, width: 80 }}
//       center={parentMap.getCenter()}
//       zoom={mapZoom}
//       dragging={false}
//       doubleClickZoom={false}
//       scrollWheelZoom={false}
//       attributionControl={false}
//       zoomControl={false}>
//       <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//       <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
//     </MapContainer>
//   ),
//   [],
// )

//   const positionClass =
//     (position && POSITION_CLASSES[position]) || POSITION_CLASSES.topright;
//   return (
//     <div className={positionClass}>
//       <div className="leaflet-control leaflet-bar">
//         <Button>press</Button>
//       </div>
//     </div>
//   );
// }
