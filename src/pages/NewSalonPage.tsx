import React, { useState } from "react";
import { createSalon, uploadSalonImage, createServices } from "../services/api";
import { useNavigate } from "react-router-dom";

const NewSalonPage: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [services, setServices] = useState<
    { name: string; price: number; duration_minutes: number }[]
  >([{ name: "", price: 0, duration_minutes: 30 }]);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleServiceChange = (index: number, field: string, value: any) => {
    const updated = [...services];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const addServiceField = () => {
    setServices([...services, { name: "", price: 0, duration_minutes: 30 }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadSalonImage(imageFile);
      }

      // Create salon
      const newSalon = await createSalon({
        name,
        address,
        description,
        image_url: imageUrl,
      });

      // Add services
      const filteredServices = services.filter((s) => s.name.trim() !== "");
      if (filteredServices.length > 0) {
        await createServices(newSalon.id, filteredServices);
      }

      alert(`Salon "${newSalon.name}" created successfully!`);
      navigate("/");
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Salon</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Salon Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded p-2"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          className="w-full border rounded p-2"
        />

        {/* Services */}
        <div className="space-y-3">
          <h2 className="font-semibold">Services</h2>
          {services.map((service, index) => (
            <div key={index} className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Service Name"
                value={service.name}
                onChange={(e) =>
                  handleServiceChange(index, "name", e.target.value)
                }
                className="border rounded p-2"
              />
              <input
                type="number"
                placeholder="Price"
                value={service.price}
                onChange={(e) =>
                  handleServiceChange(index, "price", Number(e.target.value))
                }
                className="border rounded p-2"
              />
              <input
                type="number"
                placeholder="Duration (mins)"
                value={service.duration_minutes}
                onChange={(e) =>
                  handleServiceChange(
                    index,
                    "duration_minutes",
                    Number(e.target.value)
                  )
                }
                className="border rounded p-2"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addServiceField}
            className="text-sm text-blue-600 underline"
          >
            + Add Another Service
          </button>
        </div>

        {/* Submit */}
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
