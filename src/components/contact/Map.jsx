import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const Map = () => {
    const position = [-6.2240197, 106.8421805]; // Koordinat posisi peta

    return (
        <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
                <Popup>
                    <h2 className='text-xl font-bold mb-4'>OFFICE 88 @KASABLANKA</h2>
                    <p>
                    Kota Kasablanka, Jl. Raya Casablanca, RT.2/RW.12, Menteng Dalam, Kec. Tebet,
                    Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12960
                    </p>
                    <p>Klik :
                    <a
                        className='mt-1 ml-1'
                        href="https://maps.google.com/maps/dir//OFFICE+88+@KASABLANKA+Kota+Kasablanka+Jl.+Raya+Casablanca+RT.2%2FRW.12,+Menteng+Dalam,+Kec.+Tebet,+Kota+Jakarta+Selatan,+Daerah+Khusus+Ibukota+Jakarta+12960/@-6.2240197,106.8421805,13z/data=!4m5!4m4!1m0!1m2!1m1!1s0x2e69f35465078833:0x246240ea989fa6d3"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                    detail
                    </a>
                    </p>
                    
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default Map;
