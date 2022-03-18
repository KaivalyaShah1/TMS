import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
const zoom = 13;

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png',
});

function Maps({ regionCoord, regionName }) {
  const [properties, setproperties] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/properties')
      .then((res) => res.json())
      .then((data) => {
        setproperties(data.data);
      });
  }, []);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          {regionCoord && (
            <MapContainer
              center={[23.08230029905912, 72.53889255463521]}
              zoom={zoom}
              style={{ height: '90vh' }}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />

              {properties &&
                properties.map((property) => (
                  <Marker
                    key={property.name}
                    position={[property.position.lat, property.position.lng]}
                    icon={icon}
                  >
                    <Popup>
                      <div>
                        <h3>{property.name}</h3>
                        <p>{property.address}</p>
                      </div>
                    </Popup>
                  </Marker>
                ))}
            </MapContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default Maps;
