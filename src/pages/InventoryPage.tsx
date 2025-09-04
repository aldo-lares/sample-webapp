import React from 'react';
import { useProducts } from '../context/ProductContext';

export const InventoryPage: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="page-container">
      <div className="content-card">
        <h1>Inventario de Productos</h1>
        <p>Estado actual del inventario</p>
        
        <div className="inventory-table">
          <div className="table-header">
            <div>Producto</div>
            <div>Categoría</div>
            <div>Cantidad</div>
          </div>
          
          {products.map(product => (
            <div key={product.id} className="table-row">
              <div className="product-name">{product.name}</div>
              <div className="product-category">{product.category}</div>
              <div className="product-quantity">
                <span className={`quantity-badge ${product.quantity < 20 ? 'low-stock' : ''}`}>
                  {product.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};