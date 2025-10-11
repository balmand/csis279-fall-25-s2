import { useState } from "react";
import axios from "axios";

export default function useRegistration() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("http://localhost:4000/api/register", formData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
