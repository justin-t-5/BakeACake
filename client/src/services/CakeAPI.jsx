import axios from 'axios';

const BASE_URL = 'http://localhost:3002/api/cakes';

export const getAllCakes = () => axios.get(BASE_URL);
export const getCake = (id) => axios.get(`${BASE_URL}/${id}`);
export const createCake = (data) => axios.post(BASE_URL, data);
export const updateCake = (id, data) => axios.patch(`${BASE_URL}/${id}`, data);
export const deleteCake = (id) => axios.delete(`${BASE_URL}/${id}`);