/**
 * Parkit — Centralized API Client
 *
 * All feature-specific services (authService, listingService, etc.) must
 * import from this module rather than constructing their own fetch calls.
 *
 * Environment variable:
 *   VITE_API_URL  – override the base URL (e.g. http://localhost:5000 for local dev)
 *                   Falls back to the production API when the variable is absent.
 */

// ---------------------------------------------------------------------------
// Base URL
// ---------------------------------------------------------------------------

const BASE_URL = (import.meta.env.VITE_API_URL || "https://parkit-api.pratik-labs.xyz").replace(
  /\/$/,
  ""
);

// ---------------------------------------------------------------------------
// Error class
// ---------------------------------------------------------------------------

/**
 * Thrown whenever the server responds with a non-2xx status code.
 *
 * Properties:
 *   message  – human-readable description
 *   status   – HTTP status code (number)
 *   data     – parsed response body (object | null)
 */
export class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// ---------------------------------------------------------------------------
// Core request helper
// ---------------------------------------------------------------------------

/**
 * Makes an HTTP request to the Parkit backend.
 *
 * @param {string} method   - HTTP verb: GET | POST | PATCH | DELETE
 * @param {string} endpoint - Path starting with "/" e.g. "/listing/"
 * @param {object|FormData|null} body - Request payload.
 *   - Pass a plain object  -> serialised as JSON (Content-Type set automatically).
 *   - Pass a FormData      -> sent as multipart/form-data (browser sets boundary).
 *   - Pass null / omit     -> no body (appropriate for GET / DELETE).
 * @param {object} [options]         - Extra fetch options to merge in.
 * @returns {Promise<any>}           - Parsed JSON body of a successful response.
 *                                     Returns null for 204 No Content.
 * @throws {ApiError}                - On any non-2xx response.
 */
export async function request(method, endpoint, body = null, options = {}) {
  const url = `${BASE_URL}${endpoint}`;

  const headers = { ...(options.headers || {}) };

  let fetchBody = undefined;

  if (body !== null && body !== undefined) {
    if (body instanceof FormData) {
      // Let the browser set Content-Type including the multipart boundary.
      // Do NOT set Content-Type manually here.
      fetchBody = body;
    } else {
      // Plain object -> JSON
      headers["Content-Type"] = "application/json";
      fetchBody = JSON.stringify(body);
    }
  }

  const init = {
    method,
    headers,
    // credentials: "include" will be added once the auth mechanism is confirmed.
    ...options,
    body: fetchBody,
  };

  let response;
  try {
    response = await fetch(url, init);
  } catch (networkError) {
    // Network-level failures (offline, CORS preflight hard-failure, etc.)
    throw new ApiError(
      `Network error: ${networkError.message}`,
      0,
      null
    );
  }

  // Parse response body (attempt JSON regardless of status so error bodies
  // from the server are available on the thrown ApiError).
  let data = null;
  if (response.status !== 204) {
    const contentType = response.headers.get("Content-Type") || "";
    if (contentType.includes("application/json")) {
      try {
        data = await response.json();
      } catch {
        // Non-JSON body -- leave data as null
      }
    }
  }

  if (!response.ok) {
    // Prefer the server's own message when available.
    const serverMessage =
      (data && (data.message || data.error || data.detail)) ||
      `Request failed with status ${response.status}`;

    throw new ApiError(serverMessage, response.status, data);
  }

  return data;
}

// ---------------------------------------------------------------------------
// Convenience wrappers
// ---------------------------------------------------------------------------

/**
 * GET  endpoint
 * No body -- query parameters must be appended to the endpoint string.
 *
 * @param {string} endpoint
 * @param {object} [options]
 * @returns {Promise<any>}
 */
export function get(endpoint, options = {}) {
  return request("GET", endpoint, null, options);
}

/**
 * POST  endpoint  body
 *
 * @param {string} endpoint
 * @param {object|FormData} [body]
 * @param {object} [options]
 * @returns {Promise<any>}
 */
export function post(endpoint, body = null, options = {}) {
  return request("POST", endpoint, body, options);
}

/**
 * PATCH  endpoint  body
 *
 * @param {string} endpoint
 * @param {object|FormData} [body]
 * @param {object} [options]
 * @returns {Promise<any>}
 */
export function patch(endpoint, body = null, options = {}) {
  return request("PATCH", endpoint, body, options);
}

/**
 * DELETE  endpoint
 * Body is optional for DELETE; pass null when not needed.
 *
 * @param {string} endpoint
 * @param {object|null} [body]
 * @param {object} [options]
 * @returns {Promise<any>}
 */
export function del(endpoint, body = null, options = {}) {
  return request("DELETE", endpoint, body, options);
}

// ---------------------------------------------------------------------------
// Default export -- named group for convenient * imports in feature services
// ---------------------------------------------------------------------------

const api = { get, post, patch, del, request, BASE_URL, ApiError };
export default api;
