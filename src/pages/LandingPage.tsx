import { useMemo, useState } from "react";
import Header from "../components/Header";
import TravelForm from "../components/TravelForm";
import { destinations } from "../constants/destinations";

function LandingPage() {
  const [selectedPlace, setSelectedPlace] = useState(destinations[0]?.label ?? "");
  const [showTravelForm, setShowTravelForm] = useState(false);

  const selectedDestination = useMemo(
    () => destinations.find((item) => item.label === selectedPlace) ?? destinations[0],
    [selectedPlace]
  );

  return (
    <>
      <Header />

      <main style={{ padding: "50px 20px" }}>
        {!showTravelForm ? (
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.9)",
              border: "1px solid #dbe3f0",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
              padding: "32px 24px",
              borderRadius: "18px",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "18px", textAlign: "center" }}>
              Welcome back
            </h2>

            <div style={{ marginBottom: "22px" }}>
              <label
                htmlFor="destination-select"
                style={{
                  display: "block",
                  marginBottom: "10px",
                  fontWeight: 700,
                  color: "#0f172a",
                }}
              >
                Pick a place
              </label>

              <select
                id="destination-select"
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "10px",
                  fontSize: "1rem",
                  background: "#fff",
                  color: "#0f172a",
                }}
              >
                {destinations.map((destination) => (
                  <option key={destination.label} value={destination.label}>
                    {destination.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedDestination && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <img
                  src={selectedDestination.image}
                  alt={selectedDestination.label}
                  style={{
                    width: "100%",
                    maxWidth: "720px",
                    height: "360px",
                    objectFit: "cover",
                    borderRadius: "16px",
                    display: "block",
                  }}
                />

                <div
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 700,
                    color: "#0f172a",
                    textAlign: "center",
                  }}
                >
                  Selected destination: {selectedDestination.label}
                </div>

                <button
                  type="button"
                  onClick={() => setShowTravelForm(true)}
                  style={{
                    background: "#d90429",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "12px 24px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Submit
                </button>
              </div>
            )}
          </div>
        ) : (
          <TravelForm initialDestination={selectedPlace} />
        )}
      </main>
    </>
  );
}

export default LandingPage;
