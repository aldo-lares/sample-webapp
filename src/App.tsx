import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { ProductProvider } from "./context/ProductContext";
import { HomePage } from "./pages/HomePage";
import { InventoryPage } from "./pages/InventoryPage";
import { ModifyQuantitiesPage } from "./pages/ModifyQuantitiesPage";
import { PointOfSale } from "./components/PointOfSale";
import "./theme.css";

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'inventory':
        return <InventoryPage />;
      case 'modify':
        return <ModifyQuantitiesPage />;
      case 'pos':
        return <PointOfSale />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ProductProvider>
      <div className='app-shell'>
        <NavBar currentPage={currentPage} onNavigate={setCurrentPage} />
        <main className='main-content'>
          {renderPage()}
        </main>
      </div>
    </ProductProvider>
  );
}
