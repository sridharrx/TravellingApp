type DestinationCardProps = {
  label: string;
  image: string;
};

function DestinationCard({ label, image }: DestinationCardProps) {
  return (
    <div
      style={{
        position: "relative",
        width: "220px",
        height: "220px",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "14px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          fontSize: "16px",
          fontWeight: 700,
          color: "#0f172a",
          background: "rgba(255,255,255,0.9)",
          padding: "8px 14px",
          borderRadius: "12px",
          textAlign: "center",
          boxShadow: "0 6px 14px rgba(15, 23, 42, 0.12)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      <img
        src={image}
        alt={label}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "18px",
          boxShadow: "0 10px 20px rgba(15, 23, 42, 0.12)",
          display: "block",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default DestinationCard;
