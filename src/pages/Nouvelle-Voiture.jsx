import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postCarRental } from "../redux/apiCall";
import MainLayout from "../components/MainLayout";
import CarForm from "./CarForm";

function Nouvelle() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    immatricule: "",
    year: "",
    kilometers: "",
    pricePerDay: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImmatriculeChange = (e) => {
    let { value } = e.target;

    // إزالة الأحرف غير المسموح بها
    value = value.replace(/[^0-9A-Za-z]/g, "");

    // إضافة الشرطة تلقائيًا
    if (value.length > 4 && value.length <= 6) {
      value = value.slice(0, 4) + "-" + value.slice(4);
    } else if (value.length > 6) {
      value = value.slice(0, 4) + "-" + value[4] + "-" + value.slice(5);
    }

    setForm({ ...form, immatricule: value });
  };

  const validateForm = () => {
    const immatriculePattern = /^[0-9]{4}-[A-Z]{1}-[0-9]{2}$/;
    const currentYear = new Date().getFullYear();

    if (
      !form.name ||
      !form.immatricule ||
      !form.year ||
      !form.kilometers ||
      !form.pricePerDay
    ) {
      setError("Tous les champs doivent être rempli.");
      return false;
    }
    if (!immatriculePattern.test(form.immatricule)) {
      setError(
        "Le format de l’immatricule est invalide. Format attendu: 1234-A-65"
      );
      return false;
    }
    if (parseFloat(form.kilometers) <= 0 || parseFloat(form.pricePerDay) <= 0) {
      setError(
        "Le Kilométrage et le Coût de location / Jour doivent être des nombres positifs."
      );
      return false;
    }
    if (parseInt(form.year) < 1 || parseInt(form.year) > currentYear) {
      setError(`L'année d'immatriculation doit être entre 1 et ${currentYear}.`);
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      dispatch(postCarRental(form)).then((res) => {
        if (res.error) {
          setError("Le code d'immatriculation existe déjà.");
        } else {
          navigate("/");
        }
      });
    }
  };

  return (
    <MainLayout>
      <div className="container mt-4 text-left">
        <div className="container w-75">
          <h1 style={{ fontSize: "40px", fontWeight: "700" }} className="mb-4">
            Nouvelle Voiture
          </h1>
          <CarForm
            form={form}
            onChange={handleChange}
            onImmatriculeChange={handleImmatriculeChange}
            onSubmit={handleSubmit}
            error={error}
          />
        </div>
      </div>
    </MainLayout>
  );
}

export default Nouvelle;
