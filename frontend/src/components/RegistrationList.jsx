import React from "react";

export default function RegistrationList({ registrations = [], onEdit, onDelete }) {
  if (!registrations || registrations.length === 0) {
    return <p>No registered users yet.</p>;
  }

  return (
    <div className="registration-list">
      <h3>Registered Users</h3>
      <ul>
        {registrations.map((u) => (
          <li key={u.id}>
            <strong>
              {u.firstName} {u.lastName}
            </strong>{" "}
            – {u.email}
            <div className="actions">
              {onEdit && (
                <button className="btn btn-secondary" onClick={() => onEdit(u)}>
                  Edit
                </button>
              )}
              {onDelete && (
                <button className="btn btn-danger" onClick={() => onDelete(u.id)}>
                  Delete
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
