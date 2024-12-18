import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editCarRental, fetchCarRenalDetails } from '../redux/apiCall';
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import CarEditForm from './CarEditForm';
import ErrorMessage from './ErrorMessage';

function Edite() {
  const navigate = useNavigate();
  const { carId } = useParams();
  const dispatch = useDispatch();
  const car = useSelector((state) => state.car.car);

  useEffect(() => {
    dispatch(fetchCarRenalDetails(carId));
  }, [dispatch, carId]);

  const [form, setForm] = useState({
    name: car?.name,
    immatricule: car?.immatricule,
    year: car?.year,
    kilometers: car?.kilometers,
    pricePerDay: car?.pricePerDay,
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const immatriculePattern = /^[0-9]{4}-[A-Za-z]{1}-[0-9]{2}$/;
    if (
      !form.name ||
      !form.immatricule ||
      !form.year ||
      !form.kilometers ||
      !form.pricePerDay
    ) {
      setError("Tous les champs doivent être remplis.");
      return false;
    }

    if (!immatriculePattern.test(form.immatricule)) {
      setError("Le format de l’immatricule est invalide. Format attendu: 1234-A-65");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(editCarRental({ _id: car._id, ...form })).then(() =>
        navigate("/")
      );
    }
  };

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
  
  return (
    <div className="container-fluid">
      <Navbar />
      <div className="row">
        <Sidebar />
        <div className="col-12 col-md-10">
          <div className="container mt-4 text-left">
            <div className="container w-75">
              <h1 style={{ fontSize: "40px", fontWeight: "700" }} className="mb-4">
                Editer Voiture
              </h1>
              <CarEditForm
                form={form}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                error={error}
              />
              <ErrorMessage error={error} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edite;
