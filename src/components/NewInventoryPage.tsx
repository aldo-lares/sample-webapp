import React, { useState, useMemo } from 'react';
import { ProductWithStatus } from '../types/inventory';
import { getStockIcon, addStatusToProducts } from '../utils/inventory';

interface InventoryPageProps {
  products: ProductWithStatus[];
}

type SortField = 'name' | 'quantity';
type SortDirection = 'asc' | 'desc';

export const NewInventoryPage: React.FC<InventoryPageProps> = ({ products }) => {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      let comparison = 0;
      
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison = a.quantity - b.quantity;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [products, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return '↕️';
    return sortDirection === 'asc' ? '⬆️' : '⬇️';
  };

  return (
    <div className="inventory-page">
      <h1>Inventario de Productos</h1>
      <p>Estado del stock: 🔴 Bajo (&lt;3) | 🟡 Medio (4-6) | 🟢 Alto (7+)</p>
      
      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th 
                className="sortable" 
                onClick={() => handleSort('name')}
              >
                Producto {getSortIcon('name')}
              </th>
              <th 
                className="sortable" 
                onClick={() => handleSort('quantity')}
              >
                Cantidad {getSortIcon('quantity')}
              </th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id} className={`status-${product.status}`}>
                <td className="product-name">{product.name}</td>
                <td className="product-quantity">{product.quantity}</td>
                <td className="product-status">
                  <span className="status-icon">{getStockIcon(product.status)}</span>
                  <span className="status-text">
                    {product.status === 'low' && 'Bajo'}
                    {product.status === 'medium' && 'Medio'}
                    {product.status === 'high' && 'Alto'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="inventory-summary">
        <p>Total de productos: {products.length}</p>
        <p>
          Productos con stock bajo: {products.filter(p => p.status === 'low').length} |
          Medio: {products.filter(p => p.status === 'medium').length} |
          Alto: {products.filter(p => p.status === 'high').length}
        </p>
      </div>
    </div>
  );
};