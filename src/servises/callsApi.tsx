import axios from "../servises/axiosConfig";
import { Category, Province, Supplier } from "../types/typesSupplier";

export const getAllProducts = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`/api/products/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Retornando un array vacío en caso de error o de no encontrar productos
    return [];
  }
};

export const getProductsByLetter = async (letter: string): Promise<any[]> => {
  try {
    const response = await axios.get(`/api/products/findname/${letter}`);
    console.log("Response products:", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductsByCategory = async (
  categoryID: number
): Promise<Supplier[]> => {
  try {
    const response = await axios.get(`api/products/category/${categoryID}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get("/api/categories");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getAllCountries = async (): Promise<Category[]> => {
  try {
    const response = await axios.get("/api/countries");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getAllProvinces = async (
  countryId: number
): Promise<Province[]> => {
  try {
    const response = await axios.get(`/api/provinces/country/${countryId}`);
    return response.data;
  } catch (error) {
    return [];
  }
};
