import { useEffect, useState } from "react";
import Header from "../components/Header";
import { API_BASE_URL, apiFetch } from "../config/api";

const chevronStyle = {
  display: "inline-block",
  transition: "transform 0.2s ease",
  fontSize: "18px",
  color: "#374151",
};

interface BookingItem {
  destination: string;
  fromDate: string;
  toDate: string;
  travelers: number;
}

interface UserBookingsResponse {
  name: string;
  email: string;
  phone: string;
  bookings: BookingItem[];
}

function MyEnquiries() {
  const [userData, setUserData] = useState<UserBookingsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = localStorage.getItem("userId") || "12";

    const getEnquiries = async () => {
      try {
        const response = await apiFetch(`${API_BASE_URL}/api/travel/user/${userId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch user bookings");
        }

        const data = (await response.json()) as Partial<UserBookingsResponse>;

        const normalizedData: UserBookingsResponse = {
          name: data.name ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          bookings: Array.isArray(data.bookings) ? data.bookings : [],
        };

        setUserData(normalizedData);
      } catch (error) {
        console.error("Error fetching user bookings:", error);
        setUserData({ name: "", email: "", phone: "", bookings: [] });
      } finally {
        setLoading(false);
      }
    };

    getEnquiries();
  }, []);

  return (
    <>
      <Header />

      <main style={{ maxWidth: "1000px", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "24px" }}>My Enquiries</h1>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading enquiries...</p>
        ) : !userData || userData.bookings.length === 0 ? (
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              border: "1px solid #dbe3f0",
              borderRadius: "12px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            No enquiries found for this user.
          </div>
        ) : (
          <div style={{ display: "grid", gap: "18px" }}>
            <div
              style={{
                background: "#fdd7d7",
                border: "2px solid #d32f2f",
                borderRadius: "12px",
                padding: "20px",
                boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "12px 20px",
                    alignItems: "center",
                    fontSize: "15px",
                    color: "#1f2937",
                  }}
                >
                  <span><strong>Name:</strong> {userData.name || "N/A"}</span>
                  <span><strong>Email:</strong> {userData.email || "N/A"}</span>
                  <span><strong>Phone:</strong> {userData.phone || "N/A"}</span>
                </div>

                <span aria-label="Toggle user details" style={{ ...chevronStyle, transform: "rotate(90deg)" }}>
                  ▾
                </span>
              </div>
            </div>

            {userData.bookings.map((booking, index) => (
              <div
                key={`${booking.destination}-${booking.fromDate}-${index}`}
                style={{
                  background: "rgba(255,255,255,0.9)",
                  border: "1px solid #dbe3f0",
                  borderRadius: "12px",
                  padding: "20px",
                  boxShadow: "0 6px 18px rgba(15, 23, 42, 0.06)",
                }}
              >
                <p><strong>Destination:</strong> {booking.destination || "N/A"}</p>
                <p><strong>From:</strong> {booking.fromDate || "N/A"}</p>
                <p><strong>To:</strong> {booking.toDate || "N/A"}</p>
                <p><strong>Travelers:</strong> {booking.travelers ?? 0}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default MyEnquiries;
