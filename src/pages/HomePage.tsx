// src/pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import SalonList from '../components/SalonList';
import MapView from '../components/MapView';
import SearchBar from '../components/SearchBar';
import { getNearbySalons } from '../services/api';

const HomePage: React.FC = () => {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'map'>('list');

  useEffect(() => {
    // Fetch nearby salons from API or dummy data
    const fetchSalons = async () => {
      setLoading(true);
      const data = await getNearbySalons(); // Mock API call
      setSalons(data);
      setLoading(false);
    };
    fetchSalons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <SearchBar />
      <div className="flex justify-center my-4 space-x-2">
        <button
          onClick={() => setView('list')}
          className={`p-2 rounded ${view === 'list' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'}`}
        >
          List View
        </button>
        <button
          onClick={() => setView('map')}
          className={`p-2 rounded ${view === 'map' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-800'}`}
        >
          Map View
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading salons...</p>
      ) : (
        <>
          {view === 'list' && <SalonList salons={salons} />}
          {view === 'map' && <MapView salons={salons} />}
        </>
      )}
    </div>
  );
};

export default HomePage;