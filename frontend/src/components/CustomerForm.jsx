import React, { useState, useEffect } from "react";

export default function CustomerForm({ onSave, editCustomer, onCancel, loading = false }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editCustomer) setForm(editCustomer);
    else setForm({ name: "", email: "", phone: "", address: "" });
  }, [editCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSave(form, editCustomer?.id);
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        disabled={loading}
      />
      {errors.name && <span style={{ color: "red" }}>{errors.name}</span>}

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        disabled={loading}
      />
      {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        disabled={loading}
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : editCustomer ? "Update Customer" : "Add Customer"}
      </button>

      {editCustomer && (
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancel
        </button>
      )}
    </form>
  );
}
