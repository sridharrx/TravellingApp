
import { Link } from "react-router-dom";

function AgentEnquiries() {
  const enquiries = [
    {
      id: 1,
      name: "Ramesh Kumar",
      email: "ramesh@gmail.com",
      phone: "9876543210",
      destination: "Maldives",
      fromDate: "2026-11-10",
      toDate: "2026-11-15",
      adults: 2,
      children: 1,
    },
    {
      id: 2,
      name: "Priya Sharma",
      email: "priya@gmail.com",
      phone: "9876501234",
      destination: "Bali",
      fromDate: "2026-12-05",
      toDate: "2026-12-12",
      adults: 2,
      children: 0,
    },
    {
      id: 3,
      name: "Suresh Reddy",
      email: "suresh@gmail.com",
      phone: "9876512340",
      destination: "Singapore",
      fromDate: "2027-01-15",
      toDate: "2027-01-20",
      adults: 4,
      children: 2,
    },
  ];

  return (
    <div style={styles.container}>
      <Link to="/agent" style={styles.backLink}>
        ← Back to Dashboard
      </Link>

      <h1>Customer Enquiries</h1>
      <p>Total Enquiries: {enquiries.length}</p>

      {enquiries.map((enquiry) => (
        <div key={enquiry.id} style={styles.card}>
          <h2>{enquiry.name}</h2>
          <p><strong>Email:</strong> {enquiry.email}</p>
          <p><strong>Phone:</strong> {enquiry.phone}</p>
          <p><strong>Destination:</strong> {enquiry.destination}</p>
          <p><strong>From:</strong> {enquiry.fromDate}</p>
          <p><strong>To:</strong> {enquiry.toDate}</p>
          <p><strong>Adults:</strong> {enquiry.adults}</p>
          <p><strong>Children:</strong> {enquiry.children}</p>
        </div>
      ))}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    background: "linear-gradient(to bottom, #0284c7, #075985)",
    color: "#eff2f7",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
  },
 backLink: {
  display: "inline-block",
  marginBottom: "20px",
  padding: "12px 20px",
  background: "linear-gradient(to bottom, #0284c7, #075985)",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
  borderRadius: "8px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
},
};

export default AgentEnquiries;