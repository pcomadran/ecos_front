import React, { useEffect, useState } from "react";
import "./Categories.css";
import { Category } from "../types/typesSupplier";
import { getAllCategories } from "../services/callsApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, image: "../../public/images/BIENESTAR.png", name: "" },
    { id: 2, image: "../../public/images/CAPACITACION.png", name: "" },
    { id: 3, image: "../../public/images/CONSTRUCCION.png", name: "" },
    { id: 4, image: "../../public/images/CULTIVOS.png", name: "" },
    { id: 5, image: "../../public/images/GASTRONOMIA.png", name: "" },
    { id: 6, image: "../../public/images/INDUMENTARIA.png", name: "" },
    { id: 7, image: "../../public/images/MERCHAN.png", name: "" },
    { id: 8, image: "../../public/images/MUEBLES.png", name: "" },
    { id: 9, image: "../../public/images/RECICLAJE.png", name: "" },
    { id: 10, image: "../../public/images/TECNOLOGIA.png", name: "" },
    { id: 11, image: "../../public/images/TRANSPORTE.png", name: "" },
  ]);

  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: number) => {
    navigate(`/proveedores?categoria=${categoryId}`);
  };

  useEffect(() => {
    async function fetchCategories() {
      const categoriesApi = await getAllCategories();
      const updatedCategories = categories.map((category) => {
        const apiCategory = categoriesApi.find(
          (cat: Category) => cat.id === category.id
        );
        if (apiCategory) {
          return { ...category, name: apiCategory.name };
        }
        return category;
      });
      setCategories(updatedCategories);
    }
    fetchCategories();
  }, []);

  return (
    <div className="categories-container">
      <h1 className="Red-title">Red de Proveedores ECO</h1>
      <h2 className="categories-title">Categorías</h2>
      <div className="categories-grid">
        {categories.slice(0, 8).map((category) => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => handleCategoryClick(category.id)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <h3 className="category-name">{category.name}</h3>
            <div className="category-line"></div>
          </div>
        ))}
      </div>
      <div className="view-more-button-container">
        <button className="view-more-button">
          <Link to="/proveedores">Ver más Categorías</Link>
        </button>
      </div>
    </div>
  );
};

export default Categories;
