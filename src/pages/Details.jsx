import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteCarRental, fetchCarRenalDetails } from "../redux/apiCall";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import CarDetailsCard from "./CarDetailsCard";

function Details() {
  const navigate = useNavigate();
  const { carId } = useParams();
  const dispatch = useDispatch();
  const car = useSelector((state) => state.car.car);

  useEffect(() => {
    dispatch(fetchCarRenalDetails(carId));
  }, [dispatch, carId]);

  if (!car) {
    return (
      <div className="container mt-5 text-center">
        <h2>Erreur</h2>
        <p>Aucune voiture sélectionnée. Retourner à la liste.</p>
        <button className="btn btn-primary" onClick={() => navigate("/")}>
          Retour
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm("Supprimer cette voiture ?")) {
      dispatch(deleteCarRental(carId)).then(() => navigate("/"));
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <Sidebar />
        <div className="col-12 col-md-10" style={{ background: "#EBE5FC" }}>
          <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h1 className="mb-0">Détails Voiture: {car.name}</h1>
              <div>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => navigate(`/edite/${carId}`)}
                >
                  Editer
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Supprimer
                </button>
              </div>
            </div>

            <div className="row g-3 mb-4">
              <CarDetailsCard title="Immatricule" value={car.immatricule} />
              <CarDetailsCard title="Année immatriculation" value={car.year} />
              <CarDetailsCard
                title="Kilométrage"
                value={`${car.kilometers} KM`}
              />
              <CarDetailsCard
                title="Coût de location / Jour"
                value={`${car.pricePerDay} MAD`}
              />
            </div>

            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Retour à la liste
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
