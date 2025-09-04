import React, { useState } from "react";
import { NavBar, PageType } from "./components/NavBar";
import { InventoryPage } from "./components/InventoryPage";
import { UpdateInventoryPage } from "./components/UpdateInventoryPage";
import { Product } from "./types/inventory";
import { mockProducts, addStatusToProducts } from "./utils/inventory";
import "./theme.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [products, setProducts] = useState<Product[]>(mockProducts);

  const handleUpdateProduct = (productId: string, newQuantity: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => 
        product.id === productId 
          ? { ...product, quantity: newQuantity }
          : product
      )
    );
  };

  const productsWithStatus = addStatusToProducts(products);

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'inventory':
        return <InventoryPage products={productsWithStatus} />;
      case 'update-inventory':
        return <UpdateInventoryPage products={products} onUpdateProduct={handleUpdateProduct} />;
      default:
        return (
          <main className='home-container'>
            <div className='logo-card'>
              <div className='ms-logo' aria-label='Microsoft Logo'>
                <span />
                <span />
                <span />
                <span />
              </div>
              <h1>Bienvenido</h1>
              <p>Aplicación de ejemplo con React + TypeScript.</p>
              <p>Use el menú de navegación para acceder al inventario.</p>
            </div>
          </main>
        );
    }
  };

  return (
    <div className='app-shell'>
      <NavBar currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderCurrentPage()}
    </div>
  );
}
