const DEFAULT_DEPLOYED_API = "https://travellingappbackend.onrender.com";
const LOCAL_API = "http://localhost:8080";

export const API_BASE_URL = (() => {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL;

  if (configuredUrl && configuredUrl.trim()) {
    return configuredUrl.replace(/\/+$/, "");
  }

  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return LOCAL_API;
  }

  return DEFAULT_DEPLOYED_API;
})();
