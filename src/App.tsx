import React, { useState } from "react";
import { NavBar } from "./components/NavBar";
import { PointOfSale } from "./components/PointOfSale";
import "./theme.css";

type View = 'home' | 'pos';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'pos':
        return <PointOfSale />;
      case 'home':
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
            </div>
          </main>
        );
    }
  };

  return (
    <div className='app-shell'>
      <NavBar currentView={currentView} onNavigate={setCurrentView} />
      {renderContent()}
    </div>
  );
}
