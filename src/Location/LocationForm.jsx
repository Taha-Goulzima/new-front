import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarRental, createLocationAsync, fetchLocations } from "../redux/apiCall";
import { useNavigate } from "react-router-dom";

function LocaForm({ form, onChange }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cars = useSelector((state) => state.car.cars?.carsList || []); 
  const [selectedCar, setSelectedCar] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(fetchCarRental());
    }
  }, [cars, dispatch]);

  const calculateTotalPrice = (startDate, endDate, pricePerDay) => {
    if (!startDate || !endDate || !pricePerDay) return 0;
    const daysDiff = Math.ceil(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    return daysDiff > 0 ? daysDiff * pricePerDay : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    //   
    if (!selectedCar) {
      setError("Veuillez sélectionner une voiture.");
      return;
    }

    if (!form.cin || form.cin.length < 5 || !/^[A-Za-z]{2}\d{5}$/.test(form.cin)) {
      setError("Le CIN doit être au format valide.");
      return;
    }

    if (!form.address || form.address.length < 5) {
      setError("L'adresse doit comporter au moins 5 caractères.");
      return;
    }

    if (!/^\d{10}$/.test(form.phone)) {
      setError("Le numéro de téléphone doit contenir exactement 10 chiffres.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (form.startDate < today) {
      setError("La date de départ doit être aujourd'hui ou dans le futur.");
      return;
    }

    const data = {
      startDate: form.startDate,
      endDate: form.endDate,
      carId: selectedCar._id,
      name: form.name,
      lastName: form.prenom,
      cin: form.cin,
      phoneNumber: form.phone,
      address: form.address,
      price: calculateTotalPrice(form.startDate, form.endDate, selectedCar.pricePerDay),
    };

    dispatch(createLocationAsync(data))
      .unwrap()
      .then(() => {
        alert("Location créée avec succès !");
        dispatch(fetchLocations());//
        navigate("/location");
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la location :", error);
        setError(error?.message || "Une erreur s'est produite.");
      });
  };

  const handleCarChange = (e) => {
    const carId = e.target.value;
    const selected = cars.find((car) => car._id === carId);
    setSelectedCar(selected || null);
    onChange(e);  
  };

  return (
    <div className="container-fluid">
      <div
        className="header1"
        style={{
          width: "85%",
          backgroundColor: "#e7f1fc",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center">
          <div className="me-3 flex-grow-1 col-3">
            <label htmlFor="start-date" className="form-label">
              Date de départ
            </label>
            <input
              type="date"
              id="start-date"
              className="form-control"
              name="startDate"
              value={form.startDate}
              onChange={onChange}
              max={form.endDate}
            />
          </div>

          <div className="me-3 flex-grow-1 col-3">
            <label htmlFor="end-date" className="form-label">
              Date de fin
            </label>
            <input
              type="date"
              id="end-date"
              className="form-control"
              name="endDate"
              value={form.endDate || ""}
              onChange={onChange}
              min={form.startDate}
            />
          </div>

          <div className="flex-grow-1 col-3">
            <label htmlFor="car" className="form-label">
              Voiture
            </label>
            <select
              id="car"
              className="form-select"
              name="immatricule"
              value={form.immatricule}
              onChange={handleCarChange}
            >
              <option value="">Sélectionner une voiture</option>
              {cars.length > 0 ? (
                cars.map((car) => (
                  <option key={car._id} value={car._id}>
                    {car.immatricule}
                  </option>
                ))
              ) : (
                <option disabled>Aucune voiture disponible</option>
              )}
            </select>
          </div>
        </div>
      </div>

      <div className="row">
        <main className="col-md-8 mx-auto p-4">
          <form className="p-4 rounded" onSubmit={handleSubmit}>
            <div className="row">
              <h5>Infos du client</h5>
              <div className="col-5 mb-3">
                <label htmlFor="name" className="mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  placeholder="Saisir le nom"
                />
              </div>
              <div className="col-5 mb-3">
                <label htmlFor="prenom" className="mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenom"
                  name="prenom"
                  value={form.prenom}
                  onChange={onChange}
                  placeholder="Saisir le prénom"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-5 mb-3">
                <label htmlFor="cin" className="mb-2">
                  CIN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cin"
                  name="cin"
                  value={form.cin}
                  onChange={onChange}
                  placeholder="Saisir le CIN"
                />
              </div>
              <div className="col-5 mb-3">
                <label htmlFor="phone" className="mb-2">
                  N° Téléphone
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  placeholder="Saisir le N° Téléphone"
                />
              </div>
              <div className="col-10 mb-3">
                <label htmlFor="address" className="mb-2">
                  Adresse Postale
                </label>
                <textarea
                  id="address"
                  className="form-control"
                  rows="3"
                  name="address"
                  value={form.address}
                  onChange={onChange}
                  placeholder="Saisir l’adresse postale"
                ></textarea>
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Créer la Location
            </button>
            {error && (
              <p className="text-danger mt-3" style={{ fontWeight: "600" }}>
                {error}
              </p>
            )}
          </form>
        </main>

        <aside className="col-md-4 bg-light p-3">
          <h2>{selectedCar?.name || "Aucune voiture sélectionnée"}</h2>
          <ul className="list-group">
            <li className="list-group-item">
              Immatricule: {selectedCar?.immatricule || "N/A"}
            </li>
            <li className="list-group-item">
              Année Immatriculation: {selectedCar?.year || "N/A"}
            </li>
            <li className="list-group-item">
              Kilométrage: {selectedCar?.kilometers || "N/A"}
            </li>
            <li className="list-group-item">
              Tarif Journalier: {selectedCar?.pricePerDay || "N/A"}
            </li>
          </ul>
          <div className="alert mt-3 text-center" style={{ fontSize: "50px" }}>
            {calculateTotalPrice(
              form.startDate,
              form.endDate,
              selectedCar?.pricePerDay
            ) || 0}
            .<span style={{ fontSize: "25px" }}>00 MAD</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default LocaForm;
