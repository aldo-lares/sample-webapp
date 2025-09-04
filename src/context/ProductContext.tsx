import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: number;
  name: string;
  quantity: number;
  category: string;
  price: number;
}

interface ProductContextType {
  products: Product[];
  updateProductQuantity: (id: number, quantity: number) => void;
  getProduct: (id: number) => Product | undefined;
  addProduct: (product: Omit<Product, 'id'>) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const initialProducts: Product[] = [
  { id: 1, name: 'Laptop Dell', quantity: 25, category: 'Electrónicos', price: 899.99 },
  { id: 2, name: 'Mouse Inalámbrico', quantity: 50, category: 'Accesorios', price: 29.99 },
  { id: 3, name: 'Teclado Mecánico', quantity: 30, category: 'Accesorios', price: 89.99 },
  { id: 4, name: 'Monitor 24"', quantity: 15, category: 'Electrónicos', price: 199.99 },
  { id: 5, name: 'Audífonos Bluetooth', quantity: 40, category: 'Audio', price: 79.99 },
  { id: 6, name: 'Cámara Web HD', quantity: 20, category: 'Accesorios', price: 59.99 },
];

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProductQuantity = (id: number, quantity: number) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, quantity } : product
    ));
  };

  const getProduct = (id: number) => {
    return products.find(product => product.id === id);
  };

  const addProduct = (productData: Omit<Product, 'id'>) => {
    const newId = Math.max(...products.map(p => p.id), 0) + 1;
    const newProduct: Product = {
      ...productData,
      id: newId,
    };
    setProducts(prev => [...prev, newProduct]);
  };

  return (
    <ProductContext.Provider value={{ products, updateProductQuantity, getProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};