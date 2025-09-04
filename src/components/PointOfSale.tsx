import React, { useState } from "react";
import { useProducts } from "../context/ProductContext";

interface Sale {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  total: number;
  timestamp: Date;
}

export const PointOfSale: React.FC = () => {
  const { products, updateProductQuantity } = useProducts();
  
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const selectedProduct = products.find(p => p.id === selectedProductId);

  const handleSale = () => {
    if (!selectedProduct) {
      setMessage({ type: 'error', text: 'Por favor selecciona un producto' });
      return;
    }

    if (quantity <= 0) {
      setMessage({ type: 'error', text: 'La cantidad debe ser mayor a 0' });
      return;
    }

    if (quantity > selectedProduct.quantity) {
      setMessage({ 
        type: 'error', 
        text: `Stock insuficiente. Solo hay ${selectedProduct.quantity} unidades disponibles` 
      });
      return;
    }

    // Process the sale
    const newSale: Sale = {
      id: Date.now(),
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      quantity,
      total: selectedProduct.price * quantity,
      timestamp: new Date()
    };

    // Update inventory using the context
    updateProductQuantity(selectedProduct.id, selectedProduct.quantity - quantity);

    // Add sale to history
    setSales(prevSales => [newSale, ...prevSales]);

    // Show success message
    setMessage({ 
      type: 'success', 
      text: `Venta realizada exitosamente: ${quantity} x ${selectedProduct.name} = $${newSale.total.toFixed(2)}` 
    });

    // Reset form
    setQuantity(1);
    setSelectedProductId(null);

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="pos-container">
      <div className="pos-card">
        <h2>Punto de Venta</h2>
        
        <div className="pos-form">
          <div className="form-group">
            <label htmlFor="product-select">Producto:</label>
            <select 
              id="product-select"
              value={selectedProductId || ''} 
              onChange={(e) => setSelectedProductId(Number(e.target.value) || null)}
              className="product-select"
            >
              <option value="">Selecciona un producto</option>
              {products.map(product => (
                <option 
                  key={product.id} 
                  value={product.id}
                  disabled={product.quantity === 0}
                >
                  {product.name} - ${product.price.toFixed(2)} (Stock: {product.quantity})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantity-input">Cantidad:</label>
            <input
              id="quantity-input"
              type="number"
              min="1"
              max={selectedProduct?.quantity || 1}
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="quantity-input"
              disabled={!selectedProduct}
            />
          </div>

          {selectedProduct && (
            <div className="sale-summary">
              <p>Total: ${(selectedProduct.price * quantity).toFixed(2)}</p>
            </div>
          )}

          <button 
            onClick={handleSale}
            disabled={!selectedProduct || selectedProduct.quantity === 0}
            className="sell-button"
          >
            Vender
          </button>
        </div>

        {message && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        {sales.length > 0 && (
          <div className="sales-history">
            <h3>Últimas Ventas</h3>
            <div className="sales-list">
              {sales.slice(0, 5).map(sale => (
                <div key={sale.id} className="sale-item">
                  <span>{sale.productName}</span>
                  <span>Cantidad: {sale.quantity}</span>
                  <span>Total: ${sale.total.toFixed(2)}</span>
                  <span className="timestamp">
                    {sale.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};