type LoaderProps = {
  text?: string;
  overlay?: boolean;
};

function Loader({ text = "Loading...", overlay = true }: LoaderProps) {
  const spinner = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          width: "42px",
          height: "42px",
          border: "4px solid #e2e8f0",
          borderTop: "4px solid #2563eb",
          borderRadius: "50%",
          animation: "loader-spin 1s linear infinite",
        }}
      />
      {text && (
        <div style={{ fontWeight: 600, color: "#0f172a" }}>{text}</div>
      )}
    </div>
  );

  if (!overlay) {
    return (
      <>
        <style>{`
          @keyframes loader-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        {spinner}
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes loader-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.55)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 20px 45px rgba(15, 23, 42, 0.2)",
          }}
        >
          {spinner}
        </div>
      </div>
    </>
  );
}

export default Loader;
