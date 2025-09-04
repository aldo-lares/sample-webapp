import React, { useState } from "react";
import { NavBar, PageType } from "./components/NavBar";
import { ProductProvider } from "./context/ProductContext";
import { HomePage } from "./pages/HomePage";
import { InventoryPage } from "./pages/InventoryPage";
import { ModifyQuantitiesPage } from "./pages/ModifyQuantitiesPage";
import { PointOfSale } from "./components/PointOfSale";
import { NewInventoryPage } from "./components/NewInventoryPage";
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
        return <InventoryPage />;
      case 'modify':
        return <ModifyQuantitiesPage />;
      case 'pos':
        return <PointOfSale />;
      case 'new-inventory':
        return <NewInventoryPage products={productsWithStatus} />;
      case 'update-inventory':
        return <UpdateInventoryPage products={products} onUpdateProduct={handleUpdateProduct} />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ProductProvider>
      <div className='app-shell'>
        <NavBar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className='main-content'>
          {renderCurrentPage()}
        </main>
      </div>
    </ProductProvider>
  );
}
