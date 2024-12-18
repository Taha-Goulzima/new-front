import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCarRental, fetchCarRental } from "../redux/apiCall";
import MainLayout from "./MainLayout";
import CarList from "./CarList";

function Main() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cars = useSelector((state) => state.car.cars.carsList);

  useEffect(() => {
    dispatch(fetchCarRental());
  }, []);

  const handleDeleteClick = (car) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette voiture ?")) {
      dispatch(deleteCarRental(car)).then(() => dispatch(fetchCarRental()));
    }
  };

  const handleDetailsClick = (id) => {
    navigate("/details/" + id);
  };

  const handleEditClick = (car, id) => {
    navigate(`/edite/${id}`, { state: { car } });
  };

  return (
    <MainLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Liste Voitures</h1>
          <Link to="/nouvelle" className="btn btn-primary">
            Nouvelle Voiture
          </Link>
        </div>
        <CarList
          cars={cars}
          onDetailsClick={handleDetailsClick}
          onEditClick={handleEditClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
    </MainLayout>
  );
}

export default Main;
