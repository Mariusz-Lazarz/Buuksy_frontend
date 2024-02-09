import axios from "axios";
import { getToken } from "./AuthUtils";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const apiService = {
  login: (formData) => axios.post(`${API_BASE_URL}/auth/login`, formData),
  register: (formData) => axios.post(`${API_BASE_URL}/auth/register`, formData),
  fetchUserVisits: async () => {
    const token = getToken();
    if (!token) {
      throw new Error("Authorization token is missing");
    }
    const response = await axios.get(`${API_BASE_URL}/visits/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  fetchSalons: async (category) => {
    let url = `${API_BASE_URL}/salons`;
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }
    const response = await axios.get(url);
    return response.data;
  },
  fetchSalonById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/salons/${id}`);
    return response.data;
  },
  checkAvailability: async ({ date, salonId, employeeId }) => {
    const response = await axios.post(`${API_BASE_URL}/visits/availability`, {
      date,
      salonId,
      employeeId,
    });
    return response.data;
  },
  bookVisit: async (commonData) => {
    const responses = await Promise.all([
      axios.post(`${API_BASE_URL}/visits/user`, commonData),
      axios.post(`${API_BASE_URL}/visits/employee`, commonData),
    ]);

    const allSuccess = responses.every((response) => response.status === 201);
    if (!allSuccess) {
      throw new Error("An error occurred while booking the visit.");
    }

    return responses;
  },
};
