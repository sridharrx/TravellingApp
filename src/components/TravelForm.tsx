function TravelForm() {
  return (
    <div className="travel-form">
      <h1>Fly to Maldives</h1>

      {/* Dates */}
      <div className="form-row">
        <div className="form-field">
          <label>From Date</label>
          <input type="date" />
        </div>

        <div className="form-field">
          <label>To Date</label>
          <input type="date" />
        </div>
      </div>

      {/* Passenger details - 2 per row */}
      <div className="two-column-form">
        <div className="form-field">
          <label>Full Name</label>
          <input type="text" placeholder="Enter full name" />
        </div>

        <div className="form-field">
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
        </div>

        <div className="form-field">
          <label>Phone</label>
          <input type="tel" placeholder="Enter phone number" />
        </div>

        <div className="form-field">
          <label>Adults</label>
          <input type="number" min="1" defaultValue="1" />
        </div>

        <div className="form-field">
          <label>Children</label>
          <input type="number" min="0" defaultValue="0" />
        </div>
      </div>

      <button className="submit-btn">Submit</button>
    </div>
  );
}

export default TravelForm;