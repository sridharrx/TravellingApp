const DEFAULT_DEPLOYED_API = "https://travellingappbackend.onrender.com";
const LOCAL_API_IPV4 = "http://127.0.0.1:8080";
const LOCAL_API = "http://localhost:8080";

export const API_BASE_URL = (() => {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL;

  if (configuredUrl && configuredUrl.trim()) {
    return configuredUrl.replace(/\/+$/, "");
  }

  // When running the Vite dev server prefer the local backend.
  // Also treat common local hostnames as local.
  const isLocalHost = typeof window !== "undefined" && (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "0.0.0.0"
  );

  if (import.meta.env.DEV) {
    // prefer IPv4 loopback in dev to avoid servers bound only to 127.0.0.1
    return LOCAL_API_IPV4;
  }

  if (isLocalHost) {
    return LOCAL_API;
  }

  return DEFAULT_DEPLOYED_API;
})();

export const TOKEN_STORAGE_KEY = "jwtToken";

export function getStoredToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function setStoredToken(token: string | null): void {
  if (typeof window === "undefined") {
    return;
  }

  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
    return;
  }

  localStorage.removeItem(TOKEN_STORAGE_KEY);
}

export function clearAuthSession(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.setItem("isLoggedIn", "false");
  localStorage.removeItem("userName");
  localStorage.removeItem("userEmail");
}

export function extractJwtToken(response: Response, payload?: unknown): string | null {
  const authHeader = response.headers.get("authorization") || response.headers.get("Authorization");

  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    return authHeader.slice(7).trim();
  }

  if (!payload || typeof payload !== "object") {
    return null;
  }

  const data = payload as Record<string, unknown>;

  return (
    (typeof data.token === "string" && data.token) ||
    (typeof data.accessToken === "string" && data.accessToken) ||
    (typeof data.jwt === "string" && data.jwt) ||
    (typeof data.authToken === "string" && data.authToken) ||
    (typeof data.access_token === "string" && data.access_token) ||
    null
  );
}

export async function apiFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  const token = getStoredToken();
  const headers = new Headers(init.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (
    init.body &&
    typeof init.body === "string" &&
    !headers.has("Content-Type") &&
    !headers.has("content-type")
  ) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (response.status === 401 || response.status === 403) {
    clearAuthSession();

    if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
      window.location.assign("/login");
    }
  }

  return response;
}
