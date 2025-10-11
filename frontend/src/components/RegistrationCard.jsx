import React from 'react';

export default function RegistrationCard({ registrations = [], onEdit, onDelete, onView }) {
  if (!registrations || registrations.length === 0) {
    return <p>No registrations yet.</p>;
  }

  return (
    <div className="registration-cards-container">
      {registrations.map((registration) => (
        <div className="registration-card" key={registration.id}>
          <div className="registration-info">
            <h3 className="registration-name">
              {registration.firstName} {registration.lastName}
            </h3>
            <p className="registration-email">Email: {registration.email}</p>
            <p className="registration-password">Password: {registration.password}</p>
          </div>

          <div className="registration-actions">
            {onView && (
              <button onClick={() => onView(registration)} className="btn btn-primary">
                View
              </button>
            )}
            {onEdit && (
              <button onClick={() => onEdit(registration)} className="btn btn-secondary">
                Edit
              </button>
            )}
            {onDelete && (
              <button onClick={() => onDelete(registration.id)} className="btn btn-danger">
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
