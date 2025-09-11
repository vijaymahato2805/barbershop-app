// src/components/FloatingButton.tsx
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const FloatingButton = () => {
  return (
    <Link
      to="/new-salon"
      className="fixed bottom-6 right-6 bg-gradient-to-r from-indigo-500 to-purple-600 
      text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
    >
      <Plus size={28} />
    </Link>
  );
};

export default FloatingButton;
