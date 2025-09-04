export interface Product {
  id: string;
  name: string;
  quantity: number;
}

export type StockStatus = 'low' | 'medium' | 'high';

export interface ProductWithStatus extends Product {
  status: StockStatus;
}