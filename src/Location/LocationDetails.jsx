import React from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import DetailsForm from "../Location/DetailsForm";

function LocationDetails() {
  const { state } = useLocation();
  const location = state?.location;

  return (
    <MainLayout>
      <div className="container mt-4 text-left">
        <DetailsForm location={location} />
      </div>
    </MainLayout>
  );
}

export default LocationDetails;
