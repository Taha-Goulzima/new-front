import React from 'react';
import InputField from './InputField'; 

function CarEditForm({ form, handleChange, handleSubmit, error }) {
  return (
    <form onSubmit={handleSubmit}>
      <InputField
        label="Nom"
        type="text"
        id="name"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Saisir le nom de la voiture"
      />

      <div className="row">
        <div className="col-5">
          <InputField
            label="Immatricule"
            type="text"
            id="immatricule"
            name="immatricule"
            value={form.immatricule}
            onChange={handleChange}
            placeholder="1234-A-65"
          />
        </div>
        <div className="col-5">
          <InputField
            label="Annee d'immatriculation"
            type="number"
            id="year"
            name="year"
            value={form.year}
            onChange={handleChange}
            placeholder="Saisir l’année de l’imm"
            min="1"
            max={new Date().getFullYear()}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-5">
          <InputField
            label="Kilometrage"
            type="number"
            id="kilometers"
            name="kilometers"
            value={form.kilometers}
            onChange={handleChange}
            placeholder="Saisir la distance en KM"
          />
        </div>
        <div className="col-5">
          <InputField
            label="Cout de location / Jour"
            type="number"
            id="pricePerDay"
            name="pricePerDay"
            value={form.pricePerDay}
            onChange={handleChange}
            placeholder="Saisir le Prix en MAD"
          />
        </div>
      </div>

      <button type="submit" className="btn btn-success">
        Sauvegarder
      </button>
      {error && (
        <div className="mt-2 text-danger" style={{ fontSize: '14px' }}>
          {error}
        </div>
      )}
    </form>
  );
}

export default CarEditForm;
