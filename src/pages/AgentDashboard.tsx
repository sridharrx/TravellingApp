
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function AgentDashboard() {
  const navigate = useNavigate();

  const agentName = localStorage.getItem("agentName");
  const agentEmail = localStorage.getItem("agentEmail");

  if (!agentName || !agentEmail) {
    navigate("/agent-login", { replace: true });
    return null;
  }

  const agentId = localStorage.getItem("agentId");
  const phone = localStorage.getItem("agentPhone");
  const place = localStorage.getItem("agentPlaceOfOperation");

  const styles = {
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f5f7ff 0%, #eef6ff 100%)",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      color: "#1f2937"
    },
    card: {
      maxWidth: "860px",
      margin: "0 auto",
      background: "#ffffff",
      borderRadius: "20px",
      boxShadow: "0 18px 45px rgba(19, 39, 74, 0.12)",
      border: "1px solid rgba(148, 163, 184, 0.2)",
      padding: "32px"
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      marginBottom: "24px",
      flexWrap: "wrap"
    },
    title: {
      margin: 0,
      fontSize: "2.2rem",
      color: "#0f172a",
      letterSpacing: "-0.03em"
    },
    welcome: {
      margin: "8px 0 0",
      color: "#475569",
      fontSize: "1.05rem"
    },
    badge: {
      background: "linear-gradient(135deg, #2563eb, #3b82f6)",
      color: "#fff",
      borderRadius: "999px",
      padding: "8px 16px",
      fontSize: "0.85rem",
      fontWeight: 700,
      letterSpacing: "0.04em",
      textTransform: "uppercase"
    },
    detailsCard: {
      background: "#f8fafc",
      border: "1px solid #dbeafe",
      borderRadius: "16px",
      padding: "24px",
      marginTop: "24px"
    },
    detailsTitle: {
      margin: "0 0 18px",
      fontSize: "1.4rem",
      color: "#0f172a"
    },
    detailRow: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      padding: "10px 0",
      borderBottom: "1px solid #e2e8f0",
      flexWrap: "wrap"
    },
    detailLabel: {
      fontWeight: 700,
      color: "#334155"
    },
    detailValue: {
      color: "#0f172a",
      textAlign: "right",
      wordBreak: "break-word"
    },
    actions: {
      display: "flex",
      gap: "16px",
      marginTop: "28px",
      flexWrap: "wrap"
    },
    primaryLink: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 18px",
      borderRadius: "10px",
      background: "#0f172a",
      color: "#ffffff",
      textDecoration: "none",
      fontWeight: 600,
      transition: "transform 0.2s ease, box-shadow 0.2s ease",
      boxShadow: "0 8px 16px rgba(15, 23, 42, 0.15)"
    },
    secondaryButton: {
      padding: "12px 18px",
      border: "1px solid #cbd5e1",
      borderRadius: "10px",
      background: "#ffffff",
      color: "#0f172a",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.2s ease"
    }
  } as const;

  return (
    <>
      <Header />

      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div>
              <h1 style={styles.title}>Agent Dashboard</h1>
              <p style={styles.welcome}>Welcome, {agentName}!</p>
            </div>
            <span style={styles.badge}>Agent</span>
          </div>

          <div style={styles.detailsCard}>
            <h2 style={styles.detailsTitle}>Agent Details</h2>

            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Agent ID:</span>
              <span style={styles.detailValue}>{agentId || "N/A"}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Name:</span>
              <span style={styles.detailValue}>{agentName}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Email:</span>
              <span style={styles.detailValue}>{agentEmail}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Phone:</span>
              <span style={styles.detailValue}>{phone || "Not available"}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.detailLabel}>Place of Operation:</span>
              <span style={styles.detailValue}>{place || "Not available"}</span>
            </div>
          </div>

          <div style={styles.actions}>
            <Link to="/agent/enquiries" style={styles.primaryLink}>
              View Customer Enquiries
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default AgentDashboard;
