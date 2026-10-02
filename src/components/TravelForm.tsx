import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TravelForm() {

  const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "https://travellingappbackend.onrender.com").replace(/\/+$/, "");

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [destination, setDestination] = useState("");
  const [fullName, setFullName] = useState(() => localStorage.getItem("userName") || "");
  const [email, setEmail] = useState(() => localStorage.getItem("userEmail") || "");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    setFullName(localStorage.getItem("userName") || "");
    setEmail(localStorage.getItem("userEmail") || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const trimmedDestination = destination.trim();

    if (!trimmedDestination) {
      alert("Please enter a destination");
      return;
    }

    if (!fromDate) {
      alert("Please select a from date");
      return;
    }

    if (!toDate) {
      alert("Please select a to date");
      return;
    }

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
        destination: trimmedDestination,
        adults,
        children
    };

    console.log("Sending data:", travelData);
    console.log("Logged-in user:", userEmail);

    try {

        const response = await fetch(
            `${API_BASE_URL}/api/travel?email=${encodeURIComponent(userEmail)}`,
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

      <h1>Travel the World</h1>
      <p>Online: {String(isLoggedIn)}</p>

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
            placeholder="e.g. Maldives, Goa"
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

      {isLoggedIn ? (
        <button type="submit">
          Submit
        </button>
      ) : (
        <Link to="/login">
          <button type="button">Login to Submit</button>
        </Link>
      )}

    </form>
  );
}

export default TravelForm;