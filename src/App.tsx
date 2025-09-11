// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import SalonDetail from "./pages/SalonDetailPage";
import Login from "./pages/LoginPage";
import BookingPage from "./pages/BookingPage";
import MyBookingsPage from "./pages/MyBookingsPage"; // ✅ new file
import NewSalonPage from "./pages/NewSalonPage";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/salons/:id" element={<SalonDetail />} />
          <Route path="/new-salon" element={<NewSalonPage />} />

          {/* Protected routes */}
          <Route
            path="/book/:salonId"
            element={
              <AuthGuard>
                <BookingPage />
              </AuthGuard>
            }
          />
          <Route
            path="/my-bookings"
            element={
              <AuthGuard>
                <MyBookingsPage />
              </AuthGuard>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
