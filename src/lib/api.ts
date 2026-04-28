/**
 * Backend API Base URL
 * Reads from `.env.local` variable `NEXT_PUBLIC_API_URL`
 */
const headers = {
  "Content-Type": "application/json",
  "bypass-tunnel-reminder": "true",
};

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/**
 * Standard utility for making API requests to the backend.
 * Provides a wrapper around the native Web Fetch API to simplify queries.
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers = new Headers(options.headers || {});
  headers.set("bypass-tunnel-reminder", "true");
  
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  // Auto-inject JWT securely for backend
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("rk_token");
    if (token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }
  }

  const config: RequestInit = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(url, config);

    // Safely parse response — backend may return plain text on 500 errors
    const contentType = response.headers.get("content-type") || "";
    let data: any;
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      // Try to parse as JSON anyway (some servers omit the content-type header)
      try {
        data = JSON.parse(text);
      } catch {
        // Plain text response (e.g. "Internal Server Error")
        data = { message: text };
      }
    }

    if (!response.ok) {
      console.error(`❌ API Error [${response.status}]:`, data);
      throw new Error(data.message || `API Error: ${response.status} ${response.statusText}`);
    }
    
    return data;
  } catch (error) {
    console.error(`API Fetch Error [${options.method || 'GET'} ${url}]:`, error);
    throw error;
  }
}
