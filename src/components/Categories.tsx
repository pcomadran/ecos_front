import React from 'react';
import './Categories.css';

const categoriesData = [
    { id: 1, name: 'Construcción', image: '../../public/images/CONSTRUCCION.png' },
    { id: 2, name: 'Tecnología', image: '../../public/images/TECNOLOGIA.png' },
    { id: 3, name: 'Indumentaria', image: '../../public/images/INDUMENTARIA.png' },
    { id: 4, name: 'Bienestar', image: '../../public/images/BIENESTAR.png' },
    { id: 5, name: 'Gastronomía', image: '../../public/images/GASTRONOMIA.png' },
    { id: 6, name: 'Cultivos', image: '../../public/images/CULTIVOS.png' },
    { id: 7, name: 'Transporte', image: '../../public/images/TRANSPORTE.png' },
    { id: 8, name: 'Reciclaje', image: '../../public/images/RECICLAJE.png' },
];

const Categories: React.FC = () => {
    return (
        <div className="categories-container">
        <h1 className="Red-title">Red de Proveedores ECO</h1>
        <h2 className="categories-title">Categorías</h2>
        <div className="categories-grid">
            {categoriesData.map(category => (
            <div key={category.id} className="category-card">
                <img src={category.image} alt={category.name} className="category-image" />
                <h3 className="category-name">{category.name}</h3>
                <div className="category-line"></div>
            </div>
            ))}
        </div>
        <div className="view-more-button-container">
            <button className="view-more-button">Ver más Categorías</button>
        </div>
        </div>
    );
};

export default Categories;
