// src/pages/SalonDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSalonDetail } from "../services/api"; // ✅ Use new API

type Service = {
  id: string;
  name: string;
  price: number;
  duration_minutes: number;
};

type Salon = {
  id: string;
  name: string;
  image_url: string; // ✅ Supabase column name
  address: string;
  description: string;
  services?: Service[];
};

const SalonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSalon = async () => {
      if (!id) {
        setSalon(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const data = await fetchSalonDetail(id); // ✅ Real API call
        setSalon(data);
      } catch (error) {
        console.error("Failed to fetch salon:", error);
        setSalon(null);
      } finally {
        setLoading(false);
      }
    };
    fetchSalon();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading salon details...</div>;
  if (!salon) return <div className="text-center p-8 text-red-500">Salon not found.</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={salon.image_url}
          alt={salon.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{salon.name}</h1>
          <p className="text-gray-600 mb-4">{salon.address}</p>
          <p className="text-gray-800 mb-6">{salon.description}</p>

          <h2 className="text-2xl font-semibold mb-4">Services</h2>
          <div className="space-y-4">
            {salon.services?.length ? (
              salon.services.map((service) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
                >
                  <div>
                    <h3 className="text-lg font-medium">{service.name}</h3>
                    <p className="text-sm text-gray-600">
                      ₹{service.price} • {service.duration_minutes} min
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      navigate(`/booking/${salon.id}?serviceId=${service.id}`)
                    }
                    className="bg-deep-green text-white px-4 py-2 rounded-md font-semibold hover:bg-opacity-90"
                  >
                    Book
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No services available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetailPage;
