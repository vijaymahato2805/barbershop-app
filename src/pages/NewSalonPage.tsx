// src/pages/NewSalonPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { uploadImage, createSalon } from "../services/api"; // you'll implement these

const steps = ["Basic Info", "Upload Image", "Add Services", "Review & Submit"];

const NewSalonPage: React.FC = () => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [services, setServices] = useState<
    { name: string; price: number; duration: number }[]
  >([]);

  const [message, setMessage] = useState("");

  const nextStep = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  const handleAddService = () => {
    setServices([...services, { name: "", price: 0, duration: 30 }]);
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadImage(image); // ✅ Supabase upload
      }

      await createSalon({
        name,
        address,
        description,
        image: imageUrl,
        services,
      });

      setMessage("🎉 Salon added successfully!");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to add salon.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl"
      >
        {/* Stepper */}
        <div className="flex justify-between mb-6">
          {steps.map((label, i) => (
            <div
              key={i}
              className={`flex-1 text-center font-semibold ${
                i === step ? "text-indigo-600" : "text-gray-400"
              }`}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 0 && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Salon Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border rounded-lg"
            />
          </div>
        )}

        {/* Step 2: Upload Image */}
        {step === 1 && (
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] || null)}
            />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-4 w-full h-48 object-cover rounded-lg"
              />
            )}
          </div>
        )}

        {/* Step 3: Add Services */}
        {step === 2 && (
          <div className="space-y-4">
            {services.map((srv, i) => (
              <div
                key={i}
                className="flex gap-2 items-center border-b pb-2"
              >
                <input
                  type="text"
                  placeholder="Service Name"
                  value={srv.name}
                  onChange={(e) => {
                    const copy = [...services];
                    copy[i].name = e.target.value;
                    setServices(copy);
                  }}
                  className="flex-1 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={srv.price}
                  onChange={(e) => {
                    const copy = [...services];
                    copy[i].price = parseInt(e.target.value);
                    setServices(copy);
                  }}
                  className="w-24 p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Min"
                  value={srv.duration}
                  onChange={(e) => {
                    const copy = [...services];
                    copy[i].duration = parseInt(e.target.value);
                    setServices(copy);
                  }}
                  className="w-20 p-2 border rounded"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddService}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
            >
              + Add Service
            </button>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg">Salon Preview</h3>
            <p>{name}</p>
            <p>{address}</p>
            <p>{description}</p>
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-2 w-full h-48 object-cover rounded-lg"
              />
            )}
            <ul className="mt-2 space-y-1">
              {services.map((s, i) => (
                <li key={i}>
                  {s.name} – ₹{s.price} ({s.duration} min)
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          {step > 0 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Back
            </button>
          )}
          {step < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="ml-auto px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:scale-105 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="ml-auto px-4 py-2 bg-green-500 text-white rounded-lg hover:scale-105 transition"
            >
              Submit
            </button>
          )}
        </div>

        {message && (
          <p className="text-center mt-4 font-medium text-indigo-600">
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default NewSalonPage;
