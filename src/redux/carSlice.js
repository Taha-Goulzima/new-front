import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCarRental,
  editCarRental,
  fetchCarRenalDetails,
  fetchCarRental,
  postCarRental,
} from "./apiCall";

const initialState = {
  loading: false,
  error: false,
  car: {},
  cars: [],
};

const carRentalSlice = createSlice({
  name: "carRental",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build.addCase(postCarRental.pending, (state) => {
      state.loading = true;
    });

    build.addCase(postCarRental.fulfilled, (state, action) => {
      state.loading = false;
      state.car = action.payload;
    });

    build.addCase(postCarRental.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });

    build.addCase(fetchCarRental.pending, (state) => {
      state.loading = true;
    });
    build.addCase(fetchCarRental.fulfilled, (state, action) => {
      state.loading = false;
      state.cars = action.payload;
    });
    build.addCase(fetchCarRental.rejected, (state, action) => {
      state.loading = true;
      state.error = action.error;
    });
    build.addCase(deleteCarRental.pending, (state) => {
      state.loading = true;
    });
    build.addCase(deleteCarRental.fulfilled, (state, action) => {
      state.loading = false;
    });
    
    build.addCase(deleteCarRental.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    build.addCase(editCarRental.pending, (state) => {
      state.loading = true;
    });
    build.addCase(editCarRental.fulfilled, (state, action) => {
      state.loading = false;
    });
    build.addCase(editCarRental.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
    build.addCase(fetchCarRenalDetails.pending, (state, action) => {
      state.loading = true;
    });
    build.addCase(fetchCarRenalDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.car = action.payload.car;
    });
    build.addCase(fetchCarRenalDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default carRentalSlice.reducer;
