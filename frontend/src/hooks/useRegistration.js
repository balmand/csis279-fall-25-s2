import { useCallback, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function useRegistration() {
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = useCallback(
    async (formData) => {
      setLoading(true);
      setError(null);
      try {
        const user = await registerUser(formData);
        return user;
      } catch (err) {
        setError(err.message || "Registration failed");
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [registerUser]
  );

  return { register, loading, error };
}
