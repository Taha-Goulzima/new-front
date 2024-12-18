import React from "react";

function CarDetailsCard({ title, value }) {
  return (
    <div className="col-md-3">
      <div
        className="p-3 border rounded"
        style={{ backgroundColor: "#F8F9FA" }}
      >
        <strong>{title}:</strong>
        <p className="mb-0">{value}</p>
      </div>
    </div>
  );
}

export default CarDetailsCard;
