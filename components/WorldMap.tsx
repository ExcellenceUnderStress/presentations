import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { projects } from '../data/projects';

const mapStyles = {
  height: '400px',
  width: '100%',
};

const defaultCenter = { lat: 47.6062, lng: -122.3321 }; // Seattle, WA

const WorldMap = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    gsap.from('.map-container', { opacity: 0, y: 50, duration: 1 });
  }, []);

  return (
    <div className="map-container p-4 bg-gray-100 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Our Global Reach</h2>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={defaultCenter}
        >
          {projects.map((project, index) => (
            <Marker
              key={index}
              position={{ lat: project.lat, lng: project.lng }}
              onClick={() => setSelectedProject(project)}
              icon={{
                url: `${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/marker-icon.png`,
                scaledSize: typeof window !== 'undefined' && window.google ? new window.google.maps.Size(40, 40) : undefined,
              }}
            />
          ))}
          {selectedProject && (
            <InfoWindow
              position={{ lat: selectedProject.lat, lng: selectedProject.lng }}
              onCloseClick={() => setSelectedProject(null)}
            >
              <div>
                <h3 className="font-bold">{selectedProject.name}</h3>
                <p>{selectedProject.desc}</p>
                <img
                  src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/images/${selectedProject.name.replace(/\s/g, '-').toLowerCase()}.jpg`}
                  alt={selectedProject.name}
                  className="w-32 h-24 mt-2 rounded"
                />
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
      <p className="mt-4">Discover our expertise. <a href="#services" className="text-blue-600">Explore</a></p>
    </div>
  );
};

export default WorldMap; 