import React from "react";
import { Link } from "react-router-dom";

const DetailsForm = ({ location, onDelete }) => {
  const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
    if (!startDate || !endDate || !pricePerDay) return 0;
    const daysDiff = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    return daysDiff > 0 ? daysDiff * pricePerDay : 0;
  };
  const formatDate = (date) => {
    if (!date) return "YYYY-MM-DD";
    const parsedDate = new Date(date);
    return isNaN(parsedDate) ? "YYYY-MM-DD" : parsedDate.toISOString().split("T")[0];
  };
  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-left">
        Détails Location: {location?.name} {location?.lastName}
      </h1>

      <div className="card p-4 shadow-sm">
        <div className="d-flex justify-content-end mb-4">
          <button className="btn btn-success me-2">Démarrer la location</button>
          <Link
            to="/EditLocation"
            state={{ location }}
            className="btn btn-warning me-2"
          >
            Editer
          </Link>
          <button className="btn btn-danger me-2" onClick={onDelete}>
            Supprimer
          </button>
        </div>

        <div className="row">
          <div className="col-md-4">
            <h6 className="fw-bold">Voiture:</h6>
            <p>{location?.carId.name}</p>
            <h6 className="fw-bold">Immatricule:</h6>
            <p>{location?.carId.immatricule}</p>
            <h6 className="fw-bold">Année Immatriculation:</h6>
            <p>{location?.carId.year}</p>
            <h6 className="fw-bold">Kilométrage:</h6>
            <p>{location?.carId.kilometers || location?.kilometrage} KM</p>
            <h6 className="fw-bold">Tarif Journalier:</h6>
            <p>{location?.carId.pricePerDay} MAD/Jour</p>
          </div>

          <div className="col-md-4">
            <h6 className="fw-bold">Nom & Prénom:</h6>
            <p>
              {location?.name} {location?.lastName}
            </p>
            <h6 className="fw-bold">CIN:</h6>
            <p>{location?.cin}</p>
            <h6 className="fw-bold">N° Téléphone:</h6>
            <p>{location?.phoneNumber}</p>
            <h6 className="fw-bold">Adresse Postale:</h6>
            <p>{location?.address}</p>
          </div>

          <div className="col-md-4">
            <div className="d-flex justify-content-between mb-4">
              <button className="btn btn-primary" style={{ borderRadius: "20px" }}>
                Nouvelle
              </button>
            </div>

            <div className="row mb-4">
              <div className="col-12 mb-2">
                <h6 className="fw-bold">Date Début:</h6>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={formatDate(location?.startDate)}
                  readOnly
                />
              </div>
              <div className="col-12">
                <h6 className="fw-bold">Date Fin:</h6>
                <input
                  type="date"
                  className="form-control"
                  defaultValue={formatDate(location?.endDate)}
                  readOnly
                />
              </div>
            </div>

            <div className="text-center">
              <h2 className="fw-bold">{location?.price || "0.00"} MAD</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsForm;
