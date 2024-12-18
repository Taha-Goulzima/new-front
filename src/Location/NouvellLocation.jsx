import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import LocaForm from "./LocationForm";
import { useDispatch } from "react-redux";
import { createLocationAsync } from "../redux/apiCall";

function NouvelleLocation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    immatricule: "",
    name: "",
    prenom: "",
    cin: "",
    phone: "",
    address: "",
    pricePerDay: "",
    carName: "",
    year: "",
    kilometers: "",
    status: "Nouvelle",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "startDate",
      "endDate",
      "immatricule",
      "name",
      "prenom",
      "cin",
      "phone",
      "address",
    ];

    const emptyFields = requiredFields.filter((field) => !form[field]);
    if (emptyFields.length > 0) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    setError("");

    dispatch(createLocationAsync(form))
      .unwrap()
      .then(() => {
        alert("Location créée avec succès!");
        navigate("/location");
      })
      .catch((err) => {
        console.error("Erreur lors de la création de la location:", err);
        setError("Erreur lors de la création de la location.");
      });
  };

  return (
    <MainLayout>
      <div className="container mt-4 text-left">
        <h1 style={{ fontSize: "40px", fontWeight: "700" }} className="mb-4">
          Nouvelle Location
        </h1>
        <LocaForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          error={error}
        />
      </div>
    </MainLayout>
  );
}

export default NouvelleLocation;
