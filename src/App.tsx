// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage";
import SalonDetail from "./pages/SalonDetailPage";
import Login from "./pages/LoginPage";
import Booking from "./pages/BookingPage";
import MyBookingsPage from "./pages/mybookingspage";// 👈 import it
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/salons/:id" element={<SalonDetail />} />
          <Route
            path="/book/:salonId"
            element={
              <AuthGuard>
                <Booking />
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
