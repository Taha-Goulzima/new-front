function CarForm({ form, onChange, onSubmit, error, onImmatriculeChange }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="col-10 mb-3">
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
          placeholder="Saisir le nom de la voiture"
        />
      </div>
      <div className="row">
        <div className="col-5 mb-3">
          <label htmlFor="immatricule" className="mb-2">
            Immatricule
          </label>
          <input
            type="text"
            className="form-control"
            id="immatricule"
            name="immatricule"
            value={form.immatricule}
            onChange={onImmatriculeChange}
            placeholder="1234-A-65"
          />
        </div>
        <div className="col-5 mb-3">
          <label htmlFor="year" className="mb-2">
            Année d'immatriculation
          </label>
          <input
            type="number"
            className="form-control"
            id="year"
            name="year"
            value={form.year}
            onChange={onChange}
            placeholder="Saisir l’année de l’imm"
            min="1899"
            max={new Date().getFullYear()}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-5 mb-3">
          <label htmlFor="kilometers" className="mb-2">
            Kilométrage
          </label>
          <input
            type="number"
            className="form-control"
            id="kilometers"
            name="kilometers"
            value={form.kilometers}
            onChange={onChange}
            placeholder="Saisir la distance en KM"
            min="20"
          />
        </div>
        <div className="col-5 mb-3">
          <label htmlFor="pricePerDay" className="mb-2">
            Coût de location / Jour
          </label>
          <input
            type="number"
            className="form-control"
            id="pricePerDay"
            name="pricePerDay"
            value={form.pricePerDay}
            onChange={onChange}
            placeholder="Saisir le Prix en MAD"
            min="1"
          />
        </div>
      </div>
      <button type="submit" className="btn btn-primary">
        Ajouter
      </button>
      {error && (
        <div className="mt-2 text-danger" style={{ fontSize: "14px" }}>
          {error}
        </div>
      )}
    </form>
  );
}

export default CarForm;
