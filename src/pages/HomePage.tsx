import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="page-container">
      <div className='logo-card'>
        <div className='app-icon'>
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7l-10-5z"/>
            <path d="M12 6L6 9v6c0 3.33 2.51 5.85 6 5.85s6-2.52 6-5.85V9l-6-3z"/>
          </svg>
        </div>
        <h1>Bienvenido</h1>
        <p>Gestión de inventario simple y eficiente.</p>
        <p>Utiliza la navegación superior para acceder a las diferentes funciones del sistema.</p>
      </div>
    </div>
  );
};