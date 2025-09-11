// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchSalons } from "../services/api";

type Salon = {
  id: string;
  name: string;
  address: string;
  description?: string;
  image_url?: string;
  rating?: number;
  reviews?: number;
};

const HomePage: React.FC = () => {
  const [salons, setSalons] = useState<Salon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSalons = async () => {
      try {
        const data = await fetchSalons();
        setSalons(data);
      } catch (error) {
        console.error("Error loading salons:", error);
      } finally {
        setLoading(false);
      }
    };

    loadSalons();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-500">Loading salons...</p>;
  }

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Nearby Salons</h1>

      {salons.length === 0 ? (
        <p className="text-gray-500">No salons available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salons.map((salon) => (
            <div
              key={salon.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={salon.image_url || "https://via.placeholder.com/400x250"}
                alt={salon.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold">{salon.name}</h2>
                <p className="text-sm text-gray-600 mb-2">{salon.address}</p>
                <p className="text-yellow-600 font-medium">
                  ⭐ {salon.rating || "N/A"} ({salon.reviews || 0} reviews)
                </p>

                {/* ✅ Instead of going directly to booking, go to Salon Detail */}
                <Link
                  to={`/salon/${salon.id}`}
                  className="mt-4 inline-block w-full bg-deep-green text-white text-center py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
