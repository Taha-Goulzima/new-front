import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./components/Voiture";
import Nouvelle from "./pages/Nouvelle-Voiture";
import Edite from "./pages/Edite";
import Details from "./pages/Details";
import Location from "./Location/Location";
import NouvelleLocation from "./Location/NouvellLocation";
import LocationEdite from "./Location/LocationEdite";
import LocationDetails from "./Location/LocationDetails"
import { useDispatch } from "react-redux";

function App() {
  const [cars, setCars] = useState([]); // لإدارة قائمة السيارات
  const [locations, setLocations] = useState([]); // لإدارة قائمة المواقع
  // تحديث بيانات السيارة
  const updateCar = (index, updatedCar) => {
    const updatedCars = [...cars];
    updatedCars[index] = updatedCar;
    setCars(updatedCars);
  };

  // إضافة سيارة جديدة
  const addCar = (newCar) => {
    setCars([...cars, newCar]);
  };

  // إضافة موقع جديد
  const handleAddLocation = (newLocation) => {
    setLocations((prevLocations) => [...prevLocations, newLocation]);
  };

  // تحديث موقع موجود
  const updateLocation = (updatedLocation) => {
    setLocations((prevLocations) =>
      prevLocations.map((location) =>
        location.immatricule === updatedLocation.immatricule
          ? updatedLocation
          : location
      )
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/nouvelle" element={<Nouvelle addCar={addCar} />} />

        <Route path="/" element={<Main cars={cars} setCars={setCars} />} />

        <Route
          path="/edite/:carId"
          element={<Edite cars={cars} updateCar={updateCar} />}
        />

       
        <Route path="/details/:carId" element={<Details />} />

        <Route
          path="/location"
          element={<Location locations={locations} setLocations={setLocations} />}
        />

        <Route
          path="/Nouvellelocation"
          element={
            <NouvelleLocation
              onAddLocation={handleAddLocation}
              setLocations={setLocations}
            />
          }
        />

        <Route
          path="/EditLocation"
          element={<LocationEdite updateLocation={updateLocation} />}
        />
         <Route
          path="/DetailsLocation"
          element={<LocationDetails/>}
        />
      </Routes>
    </Router>
  );
}

export default App;
