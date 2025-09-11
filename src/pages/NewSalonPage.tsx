// src/pages/NewSalonPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { uploadSalonImage, createSalon, createServices } from "../services/api";

const NewSalonPage: React.FC = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [services, setServices] = useState<
    { name: string; price: number; duration_minutes: number }[]
  >([{ name: "", price: 0, duration_minutes: 0 }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddService = () => {
    setServices([...services, { name: "", price: 0, duration_minutes: 0 }]);
  };

  const handleServiceChange = (
    index: number,
    field: keyof (typeof services)[0],
    value: any
  ) => {
    const updated = [...services];
    (updated[index] as any)[field] = value;
    setServices(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadSalonImage(imageFile);
      }

      // ✅ Create salon
      const salon = await createSalon({
        name,
        address,
        description,
        image_url: imageUrl,
      });

      // ✅ Add services
      await createServices(
        salon.id,
        services.filter((s) => s.name.trim() !== "")
      );

      setMessage("🎉 Salon added successfully!");
      setName("");
      setAddress("");
      setDescription("");
      setImageFile(null);
      setServices([{ name: "", price: 0, duration_minutes: 0 }]);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create salon.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-3xl mx-auto bg-white shadow-2xl rounded-2xl p-8">
        <motion.h1
          className="text-3xl font-extrabold text-deep-green mb-6 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          ➕ Add a New Salon
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Salon Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salon Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-deep-green focus:border-deep-green"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-deep-green focus:border-deep-green"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-deep-green focus:border-deep-green"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Upload Salon Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="mt-2"
            />
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Services
            </label>
            <div className="space-y-4">
              {services.map((srv, index) => (
                <motion.div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <input
                    type="text"
                    placeholder="Service Name"
                    value={srv.name}
                    onChange={(e) =>
                      handleServiceChange(index, "name", e.target.value)
                    }
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-deep-green focus:border-deep-green"
                  />
                  <input
                    type="number"
                    placeholder="Price (₹)"
                    value={srv.price}
                    onChange={(e) =>
                      handleServiceChange(index, "price", Number(e.target.value))
                    }
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-deep-green focus:border-deep-green"
                  />
                  <input
                    type="number"
                    placeholder="Duration (min)"
                    value={srv.duration_minutes}
                    onChange={(e) =>
                      handleServiceChange(
                        index,
                        "duration_minutes",
                        Number(e.target.value)
                      )
                    }
                    className="rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-deep-green focus:border-deep-green"
                  />
                </motion.div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddService}
              className="mt-4 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 transition"
            >
              ➕ Add Service
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            className="w-full bg-deep-green text-white py-3 rounded-xl font-semibold text-lg hover:bg-opacity-90 shadow-lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Salon"}
          </motion.button>

          {message && (
            <p className="text-center mt-4 font-medium text-gray-700">
              {message}
            </p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default NewSalonPage;
