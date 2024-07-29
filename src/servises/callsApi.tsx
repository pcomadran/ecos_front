import axios from "../servises/axiosConfig";

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

export const getAllCategories = async () => {
  try {
    const response = await axios.get("/api/categories");
    return response.data;
  } catch (error) {
    return [];
  }
};
