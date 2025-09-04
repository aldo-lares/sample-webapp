import React, { useState } from 'react';
import { Product } from '../types/inventory';
import { getStockIcon, getStockStatus } from '../utils/inventory';

interface UpdateInventoryPageProps {
  products: Product[];
  onUpdateProduct: (productId: string, newQuantity: number) => void;
}

export const UpdateInventoryPage: React.FC<UpdateInventoryPageProps> = ({ 
  products, 
  onUpdateProduct 
}) => {
  const [editingQuantities, setEditingQuantities] = useState<Record<string, string>>({});
  const [successMessages, setSuccessMessages] = useState<Record<string, boolean>>({});

  const handleQuantityChange = (productId: string, value: string) => {
    setEditingQuantities(prev => ({
      ...prev,
      [productId]: value
    }));
  };

  const handleUpdateProduct = (productId: string) => {
    const newQuantityStr = editingQuantities[productId];
    const newQuantity = parseInt(newQuantityStr, 10);
    
    if (isNaN(newQuantity) || newQuantity < 0) {
      alert('Por favor ingrese una cantidad válida (no negativa)');
      return;
    }
    
    onUpdateProduct(productId, newQuantity);
    
    // Clear editing state
    setEditingQuantities(prev => {
      const newState = { ...prev };
      delete newState[productId];
      return newState;
    });
    
    // Show success message
    setSuccessMessages(prev => ({
      ...prev,
      [productId]: true
    }));
    
    // Hide success message after 2 seconds
    setTimeout(() => {
      setSuccessMessages(prev => {
        const newState = { ...prev };
        delete newState[productId];
        return newState;
      });
    }, 2000);
  };

  const handleUpdateAll = () => {
    let hasErrors = false;
    const updates: Array<{ id: string; quantity: number }> = [];
    
    for (const [productId, quantityStr] of Object.entries(editingQuantities)) {
      const quantity = parseInt(quantityStr, 10);
      if (isNaN(quantity) || quantity < 0) {
        hasErrors = true;
        break;
      }
      updates.push({ id: productId, quantity });
    }
    
    if (hasErrors) {
      alert('Por favor verifique que todas las cantidades sean válidas (no negativas)');
      return;
    }
    
    updates.forEach(({ id, quantity }) => {
      onUpdateProduct(id, quantity);
    });
    
    setEditingQuantities({});
    
    // Show success message for all updated products
    const updatedIds = updates.reduce((acc, { id }) => {
      acc[id] = true;
      return acc;
    }, {} as Record<string, boolean>);
    
    setSuccessMessages(updatedIds);
    
    setTimeout(() => {
      setSuccessMessages({});
    }, 2000);
  };

  const getCurrentQuantity = (product: Product): string => {
    return editingQuantities[product.id] ?? product.quantity.toString();
  };

  const hasChanges = Object.keys(editingQuantities).length > 0;

  return (
    <div className="update-inventory-page">
      <h1>Actualizar Inventario</h1>
      <p>Modifique las cantidades de los productos según sea necesario.</p>
      
      {hasChanges && (
        <div className="batch-actions">
          <button 
            className="btn-update-all" 
            onClick={handleUpdateAll}
          >
            Actualizar Todo
          </button>
        </div>
      )}
      
      <div className="update-inventory-list">
        {products.map((product) => {
          const currentQuantity = getCurrentQuantity(product);
          const hasChange = editingQuantities[product.id] !== undefined;
          const currentStatus = getStockStatus(parseInt(currentQuantity, 10) || 0);
          
          return (
            <div key={product.id} className="product-update-item">
              <div className="product-info">
                <div className="product-header">
                  <span className="product-name">{product.name}</span>
                  <span className="current-status">
                    {getStockIcon(currentStatus)} 
                    Cantidad: {product.quantity}
                  </span>
                </div>
                
                <div className="product-controls">
                  <input
                    type="number"
                    min="0"
                    value={currentQuantity}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    className="quantity-input"
                    placeholder="Nueva cantidad"
                  />
                  <button
                    className="btn-update"
                    onClick={() => handleUpdateProduct(product.id)}
                    disabled={!hasChange}
                  >
                    Actualizar
                  </button>
                </div>
              </div>
              
              {successMessages[product.id] && (
                <div className="success-message">
                  ✅ Cantidad actualizada correctamente
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};