import React, { useEffect } from 'react';
import axios from 'axios';
import { Supplier } from '../types/typesSupplier';

interface LocationApiCallProps {
  latitude: number;
  longitude: number;
  onProductsFetch: (products: Supplier[]) => void;
}

const LocationApiCall: React.FC<LocationApiCallProps> = ({ latitude, longitude, onProductsFetch }) => {
  useEffect(() => {
    const fetchNearbyProducts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/distance/calculate', 
          {
            params: {
              lat: latitude,
              lon: longitude,
            }
          }
        );

        const products = response.data;
        console.log("Productos cercanos:", products);

        onProductsFetch(products);
      } catch (error) {
        console.error("Error al obtener productos cercanos:", error);
      }
    };

    if (latitude !== undefined && longitude !== undefined) {
      fetchNearbyProducts();
    }
  }, [latitude, longitude, onProductsFetch]);

  return null;
};

export default LocationApiCall;
