import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function OverpassMap({ amenity, latitude, longitude, radius }) {
  const mapRef = useRef();

  useEffect(() => {
    radius = radius * 1609.34;

    const query = `
      [out:json];
      (
          node(around:${radius},${latitude},${longitude})["amenity"="${amenity}"];
          way(around:${radius},${latitude},${longitude})["amenity"="${amenity}"];
          rel(around:${radius},${latitude},${longitude})["amenity"="${amenity}"];
      );
      out;
    `;

    fetch('https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query))
      .then(response => response.json())
      .then(data => {
        const { current = {} } = mapRef;
        const { leafletElement: map } = current;

        data.elements.forEach(element => {
          if (element.type === 'node') {
            L.marker([element.lat, element.lon]).addTo(map)
              .bindPopup(`<b>${amenity}</b><br />${element.id}`).openPopup();
          } else if (element.type === 'way') {
            var latlngs = element.nodes.map(node => [node.lat, node.lon]);
            L.polygon(latlngs).addTo(map);
          }
        });
      });
  }, [amenity, latitude, longitude, radius]);

  return (
    <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: "100vh", width: "100%" }} ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
  );
}

export default OverpassMap;
