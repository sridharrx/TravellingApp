import { useEffect, useState } from "react";

function TravelForm() {

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [destination, setDestination] = useState("");
  const [fullName, setFullName] = useState(() => localStorage.getItem("userName") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  useEffect(() => {
    setFullName(localStorage.getItem("userName") || "");
    setEmail(localStorage.getItem("userEmail") || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    // Get logged-in user's email
    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        alert("Please login first");
        return;
    }

    const travelData = {
        email,
        fullName,
        fromDate,
        toDate,
        destination,
        adults,
        children
    };

    console.log("Sending data:", travelData);
    console.log("Logged-in user:", userEmail);

    try {

        const response = await fetch(
            `http://localhost:8080/api/travel?email=${encodeURIComponent(userEmail)}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(travelData)
            }
        );

        if (response.ok) {

            const data = await response.json();

            console.log("Saved successfully:", data);

            alert("Travel booking submitted successfully!");

        } else {

            const error = await response.text();

            console.error("Backend error:", error);

            alert("Failed to save booking");
        }

    } catch (error) {

        console.error("Connection error:", error);

        alert("Unable to connect to server");
    }
};

  return (
    <form className="travel-form" onSubmit={handleSubmit}>

      <h1>Fly to Maldives</h1>

      {/* Dates */}
      <div className="form-row">

        <div className="form-field">
          <label>From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label>To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            required
          />
        </div>

      </div>

      <div className="form-row">

        <div className="form-field">
          <label>Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Maldives"
            required
          />
        </div>

      </div>

      {/* Personal Details */}
      <div className="form-row">

        <div className="form-field">
          <label>Full Name</label>
          <input
            type="text"
            value={fullName}
            readOnly
          />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={email}
            readOnly
          />
        </div>

      </div>

      {/* Contact Details */}
      <div className="form-row">

        <div className="form-field">
          <label>Adults</label>
          <input
            type="number"
            min="1"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            required
          />
        </div>

        <div className="form-field">
          <label>Children</label>
          <input
            type="number"
            min="0"
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
          />
        </div>

      </div>

      <button type="submit">
        Submit
      </button>

    </form>
  );
}

export default TravelForm;