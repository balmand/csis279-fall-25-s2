import React from "react";

export default function CustomerList({ customers, onEdit, onDelete }) {
  if (!customers.length) return <p>No customers found</p>;

  return (
    <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%" }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Address</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((c) => (
          <tr key={c.id}>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.phone}</td>
            <td>{c.address}</td>
            <td>
              <button onClick={() => onEdit(c)}>Edit</button>{" "}
              <button onClick={() => onDelete(c.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
