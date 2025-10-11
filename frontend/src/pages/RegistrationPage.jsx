import React, { useState } from "react";
import RegistrationForm from "../components/RegistrationForm";
import RegistrationCard from "../components/RegistrationCard";
import RegistrationTable from "../components/RegistrationTable";
import RegistrationList from "../components/RegistrationList";
import useRegistration from "../hooks/useRegistration";

export default function RegistrationPage({ onRegister }) {
  const { register, loading, error } = useRegistration();
  const [success, setSuccess] = useState(false);
  const [registrations, setRegistrations] = useState([]);

  const handleRegister = async (formData) => {
    try {
      const user = await register(formData);
      setRegistrations((prev) => [...prev, user]);
      setSuccess(true);
      onRegister(user);
    } catch (err) {
      console.error("❌ Registration failed:", err);
    }
  };

  return (
    <div className="registration-page">
      <h2>📝 Registration</h2>

      {!success && (
        <div className="form-section">
          {error && <p className="error">{error}</p>}
          <RegistrationForm onRegister={handleRegister} loading={loading} />
        </div>
      )}

      {success && (
        <div className="success-message">
          <h3>Registration successful 🎉</h3>
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
