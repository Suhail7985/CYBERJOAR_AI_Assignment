import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap, Polyline } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet icon not showing correctly in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapUpdater = ({ selectedItem }) => {
  const map = useMap();
  useEffect(() => {
    if (selectedItem) {
      map.flyTo([selectedItem.location.coordinates[1], selectedItem.location.coordinates[0]], 12, {
        duration: 1.5
      });
    }
  }, [selectedItem, map]);
  return null;
};

const DashboardMap = ({ data, onMarkerClick, selectedItem, mapStyle = 'dark' }) => {
  const position = [20.5937, 78.9629]; // Default center (India)

  const tileUrls = {
    dark: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    terrain: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  };

  const getIcon = (type) => {
    let color = '#3b82f6'; // OSINT - Blue
    if (type === 'HUMINT') color = '#10b981'; // Green
    if (type === 'IMINT') color = '#ef4444'; // Red

    return L.divIcon({
      className: 'custom-div-icon',
      html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-lg pulse-animation" style="background-color: ${color}"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });
  };

  return (
    <div className="h-full w-full relative">
      <style>{`
        .leaflet-container {
          background: #0d0d0d;
        }
        .pulse-animation {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { transform: scale(1.1); box-shadow: 0 0 10px 10px rgba(16, 185, 129, 0); }
          100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        .leaflet-popup-content-wrapper {
          background: #1a1a1a;
          color: white;
          border: 1px solid #333;
          border-radius: 8px;
        }
        .leaflet-popup-tip {
          background: #1a1a1a;
        }
      `}</style>
      
      <MapContainer 
        center={position} 
        zoom={5} 
        scrollWheelZoom={true}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          key={mapStyle}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={tileUrls[mapStyle] || tileUrls.dark}
        />
        <ZoomControl position="topright" />
        <MapUpdater selectedItem={selectedItem} />
        
        {/* Mock Trajectory Polyline */}
        {selectedItem && (
          <Polyline 
            positions={[
              [selectedItem.location.coordinates[1] - 0.05, selectedItem.location.coordinates[0] - 0.03],
              [selectedItem.location.coordinates[1] - 0.02, selectedItem.location.coordinates[0] - 0.01],
              [selectedItem.location.coordinates[1], selectedItem.location.coordinates[0]],
              [selectedItem.location.coordinates[1] + 0.03, selectedItem.location.coordinates[0] + 0.02],
            ]}
            color="#10b981"
            dashArray="10, 10"
            weight={2}
            opacity={0.6}
          />
        )}

        <MarkerClusterGroup
          chunkedLoading
          maxClusterRadius={50}
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={true}
        >
          {data.map((item) => (
            <Marker 
              key={item._id} 
              position={[item.location.coordinates[1], item.location.coordinates[0]]}
              icon={getIcon(item.sourceType)}
              eventHandlers={{
                click: () => onMarkerClick(item),
                mouseover: (e) => {
                  e.target.openPopup();
                },
                mouseout: (e) => {
                  // Small delay to allow moving to the popup if needed, 
                  // but for simple inspection, immediate close is often cleaner
                  // e.target.closePopup(); 
                }
              }}
            >
              <Popup>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      item.sourceType === 'HUMINT' ? 'bg-emerald-500/20 text-emerald-500' :
                      item.sourceType === 'IMINT' ? 'bg-red-500/20 text-red-500' :
                      'bg-blue-500/20 text-blue-500'
                    }`}>
                      {item.sourceType}
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 uppercase">{item.classification}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mb-1">{item.title}</h4>
                  {item.imageUrl && (
                    <div className="w-full h-24 mb-2 rounded overflow-hidden border border-[#333]">
                      <img 
                        src={item.imageUrl.startsWith('http') ? item.imageUrl : `http://localhost:5000${item.imageUrl}`} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <p className="text-xs text-gray-400 line-clamp-2 mb-2">{item.description}</p>
                  <div className="text-[10px] text-gray-500 flex justify-between items-center">
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    <button 
                    onClick={() => onMarkerClick(item)}
                    className="text-emerald-500 hover:underline"
                  >
                    Full Details
                  </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

      </MapContainer>
    </div>
  );
};

export default DashboardMap;
