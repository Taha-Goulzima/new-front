import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

function CarList({ cars, onDetailsClick, onEditClick, onDeleteClick }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Nom Voiture</th>
            <th>Immatricule</th>
            <th>Année imm</th>
            <th>Kilometrage</th>
            <th>Prix /Jour</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars?.map((car, index) => (
            <tr key={index}>
              <td>{car.name}</td>
              <td>{car.immatricule}</td>
              <td>{car.year}</td>
              <td>{car.kilometers} KM</td>
              <td>{car.pricePerDay} MAD/Jour</td>
              <td className="text-center">
                <button
                  className="btn btn-sm btn-info me-1"
                  onClick={() => onDetailsClick(car._id)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  className="btn btn-sm btn-warning me-1"
                  onClick={() => onEditClick(car, car._id)}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDeleteClick( car._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CarList;
