import { useEffect, useState } from "react";
import Header from "../components/Header";
import AgentEnquiryCard from "../components/AgentEnquiryCard";
import { API_BASE_URL, apiFetch } from "../config/api";

interface Booking {
  destination?: string;
  fromDate?: string;
  toDate?: string;
  departureDate?: string;
  returnDate?: string;
  travelers?: number;
  travellers?: number;
}

interface Enquiry {
  name: string;
  email: string;
  phone: string;
  bookings: Booking[];
}

function AgentPage() {

  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const getEnquiries = async () => {

      try {

        console.log("Calling API:", API_BASE_URL);

        const response = await apiFetch(
          `${API_BASE_URL}/api/travel/all?masked=true`
        );

        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error("Failed to fetch enquiries");
        }

        const data = await response.json();

        console.log("Agent enquiries:", data);

        setEnquiries(data);

      } catch (error) {

        console.error("Error:", error);

      } finally {

        setLoading(false);

      }
    };

    getEnquiries();

  }, []);

  if (loading) {
    return (
      <>
        <Header />
        <h2 style={{ textAlign: "center" }}>Loading enquiries...</h2>
      </>
    );
  }

  return (
    <>
      <Header />

      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px 16px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "24px" }}>Agent Dashboard</h1>

        {enquiries.map((enquiry, index) => (
          <AgentEnquiryCard
            key={index}
            enquiry={enquiry}
          />
        ))}
      </div>
    </>
  );
}

export default AgentPage;