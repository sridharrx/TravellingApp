import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import TravelForm from "../components/TravelForm";
import MyEnquiries from "./MyEnquiries";
import { destinations } from "../constants/destinations";

type LandingChoice = "menu" | "booking" | "enquiries";

function LandingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedPlace, setSelectedPlace] = useState(destinations[0]?.label ?? "");
  const [landingChoice, setLandingChoice] = useState<LandingChoice>(() => {
    const view = searchParams.get("view");

    if (location.pathname === "/new-enquiry") return "booking";
    if (view === "booking") return "booking";
    if (view === "enquiries") return "enquiries";
    return "menu";
  });

  useEffect(() => {
    const view = searchParams.get("view");

    if (location.pathname === "/new-enquiry") {
      setLandingChoice("booking");
      return;
    }

    if (view === "booking") {
      setLandingChoice("booking");
      return;
    }

    if (view === "enquiries") {
      setLandingChoice("enquiries");
      return;
    }

    setLandingChoice("menu");
  }, [location.pathname, searchParams]);

  const selectedDestination = useMemo(
    () => destinations.find((item) => item.label === selectedPlace) ?? destinations[0],
    [selectedPlace]
  );

  if (landingChoice === "enquiries") {
    return <MyEnquiries />;
  }

  return (
    <>
      <Header />

      <main style={{ padding: "50px 20px" }}>
        {landingChoice === "booking" ? (
          <div
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <button
              type="button"
              onClick={() => navigate("/landing?view=menu", { replace: true })}
              style={{
                alignSelf: "flex-start",
                background: "#475569",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 18px",
                fontSize: "0.95rem",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Back to options
            </button>

            <div
              style={{
                background: "rgba(255,255,255,0.9)",
                border: "1px solid #dbe3f0",
                borderRadius: "18px",
                padding: "20px 24px",
                boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
              }}
            >
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

              </div>
            )}

            <TravelForm initialDestination={selectedPlace} />
          </div>
        ) : (
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              background: "rgba(255,255,255,0.9)",
              border: "1px solid #dbe3f0",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
              padding: "32px 24px",
              borderRadius: "18px",
            }}
          >
            <h2 style={{ marginTop: 0, marginBottom: "22px", textAlign: "center" }}>
              Welcome back
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "stretch",
                gap: "18px",
                flexWrap: "wrap",
              }}
            >
              <button
                type="button"
                onClick={() => navigate("/landing?view=enquiries")}
                style={{
                  flex: "1 1 260px",
                  minHeight: "120px",
                  background: "#f8fafc",
                  color: "#0f172a",
                  border: "1px solid #cbd5e1",
                  borderRadius: "14px",
                  padding: "26px 20px",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.05)",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                My Enquiries
              </button>

              <button
                type="button"
                onClick={() => navigate("/landing?view=booking")}
                style={{
                  flex: "1 1 260px",
                  minHeight: "120px",
                  background: "#d90429",
                  color: "#fff",
                  border: "none",
                  borderRadius: "14px",
                  padding: "26px 20px",
                  fontSize: "1.05rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 10px 24px rgba(217, 4, 41, 0.2)",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Make a new enquiry
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default LandingPage;
