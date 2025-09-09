// src/components/SalonList.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Salon {
  id: string;
  name: string;
  address: string;
  image: string;
  rating: number;
  reviews: number;
}

interface SalonListProps {
  salons: Salon[];
}

const SalonList: React.FC<SalonListProps> = ({ salons }) => {
  if (!salons || salons.length === 0) {
    return <p className="text-center text-gray-500">No salons found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {salons.map((salon) => (
        <div key={salon.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={salon.image}
            alt={salon.name}
            className="w-full h-40 object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/150?text=No+Image'; // Fallback image
              e.currentTarget.onerror = null; // Prevent infinite loop
            }}
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold">{salon.name}</h3>
            <p className="text-sm text-gray-600">{salon.address}</p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-400">★</span>
              <span className="ml-1 text-gray-700">{salon.rating} ({salon.reviews} reviews)</span>
            </div>
            <Link to={`/salons/${salon.id}`} className="mt-4 inline-block bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors">
              View Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(SalonList);
