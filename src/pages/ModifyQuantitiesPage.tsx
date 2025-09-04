import React, { useState } from 'react';
import { useProducts, Product } from '../context/ProductContext';

export const ModifyQuantitiesPage: React.FC = () => {
  const { products, updateProductQuantity } = useProducts();
  const [editedQuantities, setEditedQuantities] = useState<{ [key: number]: number }>({});
  const [successMessages, setSuccessMessages] = useState<{ [key: number]: boolean }>({});

  const handleQuantityChange = (productId: number, value: string) => {
    const quantity = parseInt(value);
    if (!isNaN(quantity)) {
      setEditedQuantities(prev => ({ ...prev, [productId]: quantity }));
    }
  };

  const handleUpdateProduct = (product: Product) => {
    const newQuantity = editedQuantities[product.id];
    
    if (newQuantity === undefined) {
      return;
    }
    
    if (newQuantity < 0) {
      alert('La cantidad no puede ser negativa');
      return;
    }

    updateProductQuantity(product.id, newQuantity);
    
    // Show success message
    setSuccessMessages(prev => ({ ...prev, [product.id]: true }));
    
    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessages(prev => ({ ...prev, [product.id]: false }));
    }, 3000);
    
    // Clear the edited quantity
    setEditedQuantities(prev => {
      const newState = { ...prev };
      delete newState[product.id];
      return newState;
    });
  };

  const handleBatchUpdate = () => {
    let hasNegative = false;
    let updatedCount = 0;
    
    // Validate all quantities first
    Object.entries(editedQuantities).forEach(([productId, quantity]) => {
      if (quantity < 0) {
        hasNegative = true;
      }
    });
    
    if (hasNegative) {
      alert('No se pueden actualizar cantidades negativas');
      return;
    }
    
    // Update all products
    Object.entries(editedQuantities).forEach(([productId, quantity]) => {
      updateProductQuantity(parseInt(productId), quantity);
      updatedCount++;
    });
    
    if (updatedCount > 0) {
      alert(`Se actualizaron ${updatedCount} productos exitosamente`);
      setEditedQuantities({});
    }
  };

  const getDisplayQuantity = (product: Product) => {
    return editedQuantities[product.id] !== undefined 
      ? editedQuantities[product.id] 
      : product.quantity;
  };

  const hasChanges = Object.keys(editedQuantities).length > 0;

  return (
    <div className="page-container">
      <div className="content-card">
        <h1>Modificar Cantidades</h1>
        <p>Ajustar inventario de productos</p>
        
        {hasChanges && (
          <div className="batch-actions">
            <button 
              className="batch-update-btn"
              onClick={handleBatchUpdate}
            >
              Actualizar Todo ({Object.keys(editedQuantities).length} productos)
            </button>
          </div>
        )}
        
        <div className="modify-table">
          <div className="table-header">
            <div>Producto</div>
            <div>Cantidad Actual</div>
            <div>Nueva Cantidad</div>
            <div>Acciones</div>
          </div>
          
          {products.map(product => (
            <div key={product.id} className="table-row">
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-category">{product.category}</div>
              </div>
              
              <div className="current-quantity">
                <span className={`quantity-badge ${product.quantity < 20 ? 'low-stock' : ''}`}>
                  {product.quantity}
                </span>
              </div>
              
              <div className="quantity-input">
                <input
                  type="number"
                  min="0"
                  value={getDisplayQuantity(product)}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  className="quantity-field"
                />
              </div>
              
              <div className="actions">
                <button
                  className="update-btn"
                  onClick={() => handleUpdateProduct(product)}
                  disabled={editedQuantities[product.id] === undefined}
                >
                  Actualizar
                </button>
                
                {successMessages[product.id] && (
                  <div className="success-message">
                    ✓ Actualizado
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};