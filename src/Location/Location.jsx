import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import LocationList from "./LocationList";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarRental, fetchLocations,deleteLocationAsync  } from "../redux/apiCall";

function Location() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const locations = useSelector((state) => state.location.locations);
  const cars = useSelector((state) => state.car.cars);

  useEffect(() => {
    dispatch(fetchLocations());
    if (!cars.carsList) {
      dispatch(fetchCarRental());
    }
  }, [dispatch, cars.carsList]);

  const handleEditClick = (location) => {
    navigate("/EditLocation/", { state: { location } }); 
  };

  const handleDetailClick = (location) => {
    navigate("/DetailsLocation", { state: { location } });
  };

  const handleDeleteClick = (locationId) => {
    dispatch(deleteLocationAsync(locationId));
  };

  return (
    <MainLayout>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="mb-0">Liste Locations</h1>
          <Link to="/Nouvellelocation" className="btn btn-primary">
            Nouvelle Location
          </Link>
        </div>
        <LocationList
          locations={locations}
          onEditClick={handleEditClick}
          onDetailClick={handleDetailClick}
          onDeleteClick={handleDeleteClick}
        />
      </div>
    </MainLayout>
  );
}

export default Location;
