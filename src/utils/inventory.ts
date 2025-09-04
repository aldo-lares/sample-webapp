import { Product, ProductWithStatus, StockStatus } from '../types/inventory';

export const getStockStatus = (quantity: number): StockStatus => {
  if (quantity < 3) return 'low';
  if (quantity >= 4 && quantity <= 6) return 'medium';
  return 'high';
};

export const getStockIcon = (status: StockStatus): string => {
  switch (status) {
    case 'low': return '🔴';
    case 'medium': return '🟡';
    case 'high': return '🟢';
    default: return '⚪';
  }
};

export const addStatusToProducts = (products: Product[]): ProductWithStatus[] => {
  return products.map(product => ({
    ...product,
    status: getStockStatus(product.quantity)
  }));
};

// Mock data for inventory
export const mockProducts: Product[] = [
  { id: '1', name: 'Laptop HP', quantity: 2 },
  { id: '2', name: 'Mouse Inalámbrico', quantity: 15 },
  { id: '3', name: 'Teclado Mecánico', quantity: 5 },
  { id: '4', name: 'Monitor 24"', quantity: 1 },
  { id: '5', name: 'Auriculares', quantity: 8 },
  { id: '6', name: 'Webcam HD', quantity: 4 },
  { id: '7', name: 'Cable USB-C', quantity: 25 },
  { id: '8', name: 'Adaptador HDMI', quantity: 6 },
];