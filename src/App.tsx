import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { ProductRegistration } from "./components/ProductRegistration";
import "./theme.css";

type Page = 'home' | 'products';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: Page) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
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
              <p>Use la navegación para registrar nuevos productos.</p>
            </div>
          </main>
        );
      case 'products':
        return (
          <main className='page-container'>
            <ProductRegistration />
          </main>
        );
      default:
        return null;
    }
  };

  return (
    <div className='app-shell'>
      <NavBar currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
    </div>
  );
}
