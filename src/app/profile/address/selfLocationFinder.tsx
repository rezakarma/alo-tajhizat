"use client";
import { Button } from "@nextui-org/react";
import { useMapEvents } from "react-leaflet";
import { LocateFixed } from "lucide-react";
function SelfLocationFinder({ setPosition }) {
    const map = useMapEvents({
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, 13);
      },
    });
  
    const locateUser = () => {
      map.locate();
    };
  
    const positionClass = POSITION_CLASSES.topright;
    return (
      <div className={"leaflet-bottom leaflet-right overflow-hidden"}>
        <div
          style={{ border: "none" }}
          className="leaflet-control leaflet-bar overflow-hidden"
        >
          <Button onClick={locateUser} isIconOnly className="bg-white">
            <LocateFixed />
          </Button>
        </div>
      </div>
    );
  }
  
  // Classes used by Leaflet to position controls
  const POSITION_CLASSES = {
    bottomleft: "leaflet-bottom leaflet-left",
    bottomright: "leaflet-bottom leaflet-right",
    topleft: "leaflet-top leaflet-left",
    topright: "leaflet-top leaflet-right",
  };

  export default SelfLocationFinder