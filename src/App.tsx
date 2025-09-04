import React from "react";
import { NavBar } from "./components/NavBar";
import "./theme.css";

export default function App() {
  return (
    <div className='app-shell'>
      <NavBar />
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
    </div>
  );
}
