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

interface AgentEnquiryCardProps {
  enquiry: Enquiry;
}

function AgentEnquiryCard({ enquiry }: AgentEnquiryCardProps) {
  const travellerCount = (booking: Booking) =>
    booking.travelers ?? booking.travellers ?? 1;

  return (
    <div
      className="agent-enquiry-card"
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "16px",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      <p style={{ marginTop: 0, textAlign: "left" }}>
        <strong>Name:</strong> {enquiry.name || "Unknown user"}
      </p>

      <p><strong>Email:</strong> {enquiry.email || "N/A"}</p>
      <p><strong>Phone:</strong> {enquiry.phone || "N/A"}</p>

      <h3>Travel Enquiries</h3>

      {enquiry.bookings.map((booking, index) => (
        <div
          key={`${booking.destination ?? "booking"}-${index}`}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "10px",
            padding: "12px",
            marginTop: "10px",
            background: "#f9fafb",
          }}
        >
          <p>
            <strong>Destination:</strong>{" "}
            {booking.destination || "Not specified"}
          </p>

          <p>
            <strong>From:</strong>{" "}
            {booking.fromDate || booking.departureDate || "N/A"}
          </p>

          <p>
            <strong>To:</strong>{" "}
            {booking.toDate || booking.returnDate || "N/A"}
          </p>

          <p>
            <strong>Travellers:</strong>{" "}
            {travellerCount(booking)}
          </p>
        </div>
      ))}
    </div>
  );
}

export default AgentEnquiryCard;