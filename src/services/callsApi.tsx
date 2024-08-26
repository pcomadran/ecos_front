//src/services/callsApi.tsx

import axios from 'axios';
// import axios from "../services/axiosConfig";
import {
  Category,
  Country,
  Province,
  Supplier,
} from "../types/typesSupplier";

export const getAllProducts = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    // Retornando un array vacío en caso de error o de no encontrar productos
    return [];
  }
};

export const getProductsByLetter = async (name: string): Promise<any[]> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/search/${name}`);
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
    const response = await axios.get(`http://localhost:8080/api/products/category/${categoryID}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getProductsBySupplier = async (): Promise<Supplier[]> => {
  try {
    const userString = localStorage.getItem("user");
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token not found");

    if (userString && token) {
      const user = JSON.parse(userString);
      const supplierID = user.id;
      const response = await axios.get(`http://localhost:8080/api/products/${supplierID}`);
      return response.data;
    }
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/products/find/${id}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get("http://localhost:8080/api/categories");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const response = await axios.get("http://localhost:8080/api/countries");
    return response.data;
  } catch (error) {
    return [];
  }
};

export const getAllProvinces = async (
  countryId: number
): Promise<Province[]> => {
  try {
    const response = await axios.get(`http://localhost:8080/api/provinces/country/${countryId}`);
    return response.data;
  } catch (error) {
    return [];
  }
};

export const createProduct = async (productData: any) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token not found");

    const response = await axios.post("http://localhost:8080/api/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateProduct = async (product: any, productID: number) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/api/products/update/${productID}`,
      product,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getDashboardAdmin = async () => {
  try {
    const response = await axios.get(`api/dashboard`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Calls para las publicaciones

// POST - Crear una nueva publicación
export const createPublication = async (publicationData: any) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token not found");

    const response = await axios.post("http://localhost:8080/api/publications", publicationData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating publication:", error);
    throw error;
  }
};

// PUT - Actualizar una publicación por ID
export const updatePublication = async (publicationData: any, id: number) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token not found");

    const response = await axios.put(`http://localhost:8080/api/publications/${id}`, publicationData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating publication:", error);
    throw error;
  }
};

// GET - Obtener todas las publicaciones (activas y no activas)
export const getAllPublications = async (): Promise<any[]> => {
  try {

    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token not found");

    const response = await axios.get("http://localhost:8080/api/publications", 
      {headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }}
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching all publications:", error);
    return [];
  }
};

// GET - Obtener una publicación por ID sin aumentar las vistas
export const getPublicationByIdWithoutViews = async (id: number) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/publications/get/${id}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching publication by ID without increasing views:",
      error
    );
    throw error;
  }
};

// GET - Aumenta las Views de la publicacion en 1 (solo si no es admin)
export const increaseViewsById = async (id: number) => {
  try {
    const token = localStorage.getItem("authToken");
    
    const response = await axios.get(`http://localhost:8080/api/publications/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching publication by ID:", error);
    throw error;
  }
};

// GET - Obtener todas las publicaciones activas
export const getAllActivePublications = async (): Promise<any[]> => {
  try {
    const response = await axios.get("http://localhost:8080/api/publications/active");
    return response.data;
  } catch (error) {
    console.error("Error fetching active publications:", error);
    return [];
  }
};

// DELETE - Cambiar el estado de una publicación a oculta (borrado virtual)
export const deletePublication = async (id: number) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("Token not found");

    const response = await axios.delete(`http://localhost:8080/api/publications/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting publication:", error);
    throw error;
  }
};

// GET - Obtener las ultimas 3 publicaciones activas ordenadas
export const getAllLastThreeActivePublications = async (): Promise<any[]> => {
  try {
    const response = await axios.get("http://localhost:8080/api/publications/last-three");
    return response.data;
  } catch (error) {
    console.error("Error fetching active publications:", error);
    return [];
  }
};
