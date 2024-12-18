import { configureStore } from "@reduxjs/toolkit";
import carSlice from "../redux/carSlice";
import locationSlice from "../redux/locationSlice"

const store = configureStore({
  reducer: {
    car: carSlice,
    location: locationSlice
  },
});

export default store;
