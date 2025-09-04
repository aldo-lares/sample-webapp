import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <div className='logo-card'>
        <div className='ms-logo' aria-label='Microsoft Logo'>
          <span />
          <span />
          <span />
          <span />
        </div>
        <h1>Bienvenido</h1>
        <p>Aplicación de ejemplo con React + TypeScript.</p>
        <p>Utiliza la navegación superior para acceder al inventario y modificar cantidades.</p>
      </div>
    </div>
  );
};