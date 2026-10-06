import Header from "../components/Header";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../constants/destinations";

function Home() {
  const destinationCards = [];

  for (const destination of destinations) {
    destinationCards.push(
      <DestinationCard
        key={destination.label}
        label={destination.label}
        image={destination.image}
      />
    );
  }

  return (
    <>
      <Header />

      <main style={{ padding: "40px 20px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
            gap: "28px",
            maxWidth: "1000px",
            margin: "0 auto",
            justifyItems: "center",
          }}
        >
          {destinationCards}
        </div>
      </main>
    </>
  );
}

export default Home;