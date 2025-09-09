// src/pages/SalonDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BookingCalendar from '../components/BookingCalendar';
import { getSalonDetail } from '../services/api';

type Salon = {
  id: string;
  name: string;
  image: string;
  address: string;
  description: string;
  // Add other properties as needed
};

const SalonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
      const data = await getSalonDetail(id); // Mock API call
      setSalon(data);
      setLoading(false);
    };
    fetchSalon();
  }, [id]);

  if (loading) return <div className="text-center p-8">Loading salon details...</div>;
  if (!salon) return <div className="text-center p-8 text-red-500">Salon not found.</div>;

  return (
    <div className="p-4 md:p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img src={salon.image} alt={salon.name} className="w-full h-64 object-cover" />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">{salon.name}</h1>
          <p className="text-gray-600 mb-4">{salon.address}</p>
          <p className="text-gray-800 mb-6">{salon.description}</p>
          <h2 className="text-2xl font-semibold mb-4">Services</h2>
          {/* Service list and prices here */}
          <BookingCalendar salonId={salon.id} />
        </div>
      </div>
    </div>
  );
};

export default SalonDetailPage;