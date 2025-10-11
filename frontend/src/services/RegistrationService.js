// Simulated backend API
const API_BASE_URL = "http://localhost:4000/api"; // optional if you have backend

export const registrationService = {
  async register(formData) {
    // Simulate sending to backend
    console.log("📤 Sending registration data:", formData);

    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return a fake successful response
    return {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
    };
  },
};
