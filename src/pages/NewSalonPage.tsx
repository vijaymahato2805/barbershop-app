// src/pages/NewSalonPage.tsx
import React, { useState } from "react";
import { createSalon } from "../services/api";
import { useNavigate } from "react-router-dom";

const NewSalonPage: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newSalon = await createSalon({
        name,
        address,
        description,
        image_url: imageUrl,
      });
      alert(`Salon "${newSalon.name}" created successfully!`);
      navigate("/"); // redirect back to Home
    } catch (err: any) {
      alert(`Failed to create salon: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Add New Salon</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Salon Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-deep-green text-white py-2 rounded hover:bg-opacity-90"
        >
          {loading ? "Saving..." : "Create Salon"}
        </button>
      </form>
    </div>
  );
};

export default NewSalonPage;
