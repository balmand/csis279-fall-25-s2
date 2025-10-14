import React, { useState } from "react";
import "./ContactUs.css"; // we'll add a little style file next

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>

      {submitted ? (
        <p className="thank-you">
          ✅ Thank you, {formData.name || "friend"}! We’ll get back to you soon.
        </p>
      ) : (
        <>
          <p>We’d love to hear from you! Please fill out the form below.</p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                required
              />
            </label>

            <button type="submit">Send Message</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ContactUs;
