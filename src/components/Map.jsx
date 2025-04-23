import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";

// Fix for default marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export default function Map() {
  const [mapPosition, setMapPosition] = useState([4, 15]);
  const [searchParams] = useSearchParams();
  const mapLat = searchParams.get("lat") || mapPosition[0];
  const mapLong = searchParams.get("lng") || mapPosition[1];

  const { locations } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geolocationPos,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (mapLat && mapLong) {
      setMapPosition([mapLat, mapLong]);
    }
  }, [mapLat, mapLong]);

  useEffect(
    function () {
      if (geolocationPos) {
        setMapPosition([geolocationPos.lat, geolocationPos.lng]);
      }
    },
    [geolocationPos]
  );

  return (
    <div className={styles.mapContainer}>
      {!geolocationPos && (
        <Button type={"position"} onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use my position"}
        </Button>
      )}
      <MapContainer
        className={styles.map}
        center={[mapLat, mapLong]}
        zoom={7}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            eventHandlers={{
              click: () => {
                setMapPosition([location.lat, location.lng]);
              },
            }}
          >
            <Popup>
              {location.emoji} {location.city_name} <br />
              {location.notes}
            </Popup>
          </Marker>
        ))}
        <DetectClick />
        <ChangeCenter lat={mapLat} lng={mapLong} />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ lat, lng }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      navigate(`/app/form?lat=${lat}&lng=${lng}`);
    },
  });

  return null;
}
