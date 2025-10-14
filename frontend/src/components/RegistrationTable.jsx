import axios from "axios";
import { useEffect, useState } from "react";

export default function RegistrationTable({ registrations: propRegistrations = [] }) {
  const [registrations, setRegistrations] = useState(propRegistrations);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (propRegistrations.length === 0) {
      retrieveRegistrations();
    }
  }, [propRegistrations]);

  const retrieveRegistrations = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:4000/api/registrations");
      if (response.status === 200) {
        setRegistrations(response.data);
      }
    } catch (e) {
      alert("Error retrieving registrations: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Registrations Table</h2>
      {loading && <p>Loading registrations...</p>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.firstName} {r.lastName}</td>
              <td>{r.email}</td>
              <td>{r.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
