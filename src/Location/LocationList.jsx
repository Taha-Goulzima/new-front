import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./LocationList.css";
import { useDispatch } from "react-redux";
import { fetchLocations } from "../redux/apiCall";

function LocationList({ locations, onEditClick, onDetailClick, onDeleteClick }) {
  const dispatch = useDispatch();

  const formatterDate = (date) => {
    const dateformat = new Date(date);
    return `${dateformat.getDate()}/${dateformat.getMonth() + 1}/${dateformat.getFullYear()}`;
  };

  const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
    const daysDiff = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    return daysDiff * pricePerDay;
  };

  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  return (
    <div className="rental-manager">
      <table className="locations-table">
        <thead>
          <tr>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Client</th>
            <th>Voiture</th>
            <th>Prix</th>
            <th>État</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((loc, index) => (
            <tr key={index}>
              <td>{formatterDate(loc.startDate)}</td>
              <td>{formatterDate(loc.endDate)}</td>
              <td>{`${loc.name} ${loc.lastName}`}</td>
              <td>
                {loc.carId ? loc.carId.immatricule: ""} <br />
                {loc.carId ? loc.carId.name : ""}
              </td>
              <td>{calculateTotalPrice(loc.startDate, loc.endDate, loc.carId ? loc.carId.pricePerDay : 0)} MAD</td>
              <td>
                <span
                  className={`status ${loc.status ? loc.status.toLowerCase() : "nouvelle"} btn btn-primary`}
                  style={{ borderRadius: "20px" }}
                >
                  {loc.etat || "Nouvelle"}
                </span>
              </td>
              <td>
                <button
                  className="btn btn-sm btn-info me-1"
                  onClick={() => onDetailClick(loc)}
                >
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <button
                  className="btn btn-sm btn-warning me-1"
                  onClick={() => {
                    console.log(loc.carId); // Log carId object
                    onEditClick(loc);
                  }}
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDeleteClick(loc._id)} 
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

export default LocationList;
