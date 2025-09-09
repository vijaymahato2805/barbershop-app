// src/components/MapView.tsx
import React from 'react';

// This is a placeholder for the Google Maps component.
// It will display a simple text message until the Google Maps API is integrated.

interface Salon {
  id: string;
  name: string;
  // Add other properties of a salon as needed
}

interface MapViewProps {
  salons: Salon[];
}

const MapView = ({ salons }: MapViewProps) => {
  if (!salons || salons.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 bg-white rounded-lg shadow-md h-96">
        <p className="text-gray-500">No salons found to display on the map.</p>
      </div>
    );
  }

  return (
    <div className="relative h-96 bg-gray-200 rounded-lg shadow-md">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-gray-600 font-semibold text-center">
          Map View Placeholder 🗺️
          <br />
          Salons will be displayed here using the Google Maps API.
        </p>
      </div>
      {/* You will add the Google Maps API code here later */}
    </div>
  );
};

export default MapView;