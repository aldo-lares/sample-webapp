import React from "react";

export type PageType = 'home' | 'inventory' | 'modify' | 'pos' | 'new-inventory' | 'update-inventory';

interface NavBarProps {
  currentPage: PageType;
  onPageChange: (page: PageType) => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentPage, onPageChange }) => {
  return (
    <header className='nav-bar'>
      <div className='brand'>Sample</div>
      <nav>
        <ul>
          <li 
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => onPageChange('home')}
          >
            Home
          </li>
          <li 
            className={currentPage === 'inventory' ? 'active' : ''}
            onClick={() => onPageChange('inventory')}
          >
            Inventario
          </li>
          <li 
            className={currentPage === 'modify' ? 'active' : ''}
            onClick={() => onPageChange('modify')}
          >
            Modificar Cantidades
          </li>
          <li 
            className={currentPage === 'pos' ? 'active' : ''}
            onClick={() => onPageChange('pos')}
          >
            Punto de Venta
          </li>
          <li 
            className={currentPage === 'new-inventory' ? 'active' : ''}
            onClick={() => onPageChange('new-inventory')}
          >
            Inventario v2
          </li>
          <li 
            className={currentPage === 'update-inventory' ? 'active' : ''}
            onClick={() => onPageChange('update-inventory')}
          >
            Actualizar v2
          </li>
        </ul>
      </nav>
    </header>
  );
};
