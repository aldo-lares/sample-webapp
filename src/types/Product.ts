export interface Product {
  id: string;
  name: string;
  description: string;
  unitPrice: number;
  quantity: number;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductFormData {
  name: string;
  description: string;
  unitPrice: string;
  quantity: string;
  category?: string;
}