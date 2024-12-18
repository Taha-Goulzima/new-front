import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:5001/";

// Car Rental Actions
export const postCarRental = createAsyncThunk(
  "content/postCar",
  async (car) => {
    const res = await axios.post(BASE_URL + "car", car);
    const data = await res.data;
    return data;
  }
);

export const fetchCarRental = createAsyncThunk("content/getCars", async () => {
  const res = await axios.get(BASE_URL + "car");
  const data = await res.data;
  return data;
});

export const deleteCarRental = createAsyncThunk(
  "content/deleteCar",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(BASE_URL + "car/" + id);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete operation failed");
    }
  }
);

export const editCarRental = createAsyncThunk(
  "content/editCarRental",
  async (car) => {
    const res = await axios.put(BASE_URL + "car/" + car._id, car);
    const data = await res.data;
    return data;
  }
);

// Car Rental Details by ID
export const fetchCarRenalDetails = createAsyncThunk(
  "content/fetchCarRenalDetails",
  async (id) => {
    try {
      const res = await axios.get(BASE_URL + "car/" + id);
      const data = await res.data;
      return data;
    } catch (error) {
      console.log("error");
      return error;
    }
  }
);

// Location Actions
export const createLocationAsync = createAsyncThunk(
  "content/createLocation",
  async (newLocation, { rejectWithValue }) => {
    try {
      const response = await axios.post(BASE_URL + "locations", newLocation);
      return response.data; // Return the newly created location data
    } catch (error) {
      return rejectWithValue(error.response?.data || "Create operation failed");
    }
  }
);

export const fetchLocations = createAsyncThunk(
  "content/allLocation",
  async () => {
    const location = await axios.get(BASE_URL + "locations");
    return location.data;
  }
);

export const updateLocationAsync = createAsyncThunk(
  "content/updateLocation",
  async (updatedLocation) => {
    const location = await axios.put(
      BASE_URL + "locations/" + updatedLocation._id,
      updatedLocation
    );
    return location.data;
  }
);

// Delete Location
export const deleteLocationAsync = createAsyncThunk(
  "content/deleteLocation",
  async (id, { rejectWithValue }) => {
    try {
      const location = await axios.delete(BASE_URL + "locations/" + id);
      return location.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Delete operation failed");
    }
  }
);
