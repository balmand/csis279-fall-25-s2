import React, { useEffect, useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import RegistrationCard from "../components/RegistrationCard";
import RegistrationTable from "../components/RegistrationTable";
import RegistrationList from "../components/RegistrationList";
import useRegistration from "../hooks/useRegistration";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
  const { register, loading, error } = useRegistration();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  const handleRegister = async (formData) => {
    try {
      const user = await register(formData);
      setRegistrations((prev) => [...prev, user]);
      setSuccess(true);

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1200);
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="registration-page">
      <h2>Registration</h2>

      {!success && (
        <div className="form-section">
          {error && <p className="error">{error}</p>}
          <RegistrationForm onRegister={handleRegister} loading={loading} />
        </div>
      )}

      {success && (
        <div className="success-message">
          <h3>Registration successful</h3>
          <p>Redirecting to your dashboard...</p>
        </div>
      )}

      <div className="cards-section">
        <RegistrationCard registrations={registrations} />
      </div>

      <div className="table-section">
        <RegistrationTable registrations={registrations} />
      </div>

      <div className="list-section">
        <RegistrationList registrations={registrations} />
      </div>
    </div>
  );
}
