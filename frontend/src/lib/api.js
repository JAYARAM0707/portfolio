/**
 * API helper
 * ─────────────────────────────────────────────────────
 * Centralizes all backend API calls.
 *
 * Uses VITE_API_URL from .env so we can swap between
 * local dev (localhost:8000) and production (Render URL)
 * without touching component code.
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Submit a contact form message to the backend.
 *
 * @param {Object} formData - { name, email, subject?, message }
 * @returns {Promise<Object>} response from backend
 * @throws {Error} if validation fails or network errors
 */
export async function submitContactForm(formData) {
  const response = await fetch(`${API_URL}/api/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  // If the server returned an error status (4xx or 5xx), throw with details
  if (!response.ok) {
    // FastAPI/Pydantic validation errors come as { detail: [{loc, msg, type}, ...] }
    if (Array.isArray(data?.detail)) {
      const messages = data.detail.map((err) => err.msg).join(', ');
      throw new Error(messages);
    }
    // Generic FastAPI error: { detail: "message string" }
    throw new Error(data?.detail || 'Something went wrong. Please try again.');
  }

  return data;
}