import React from "react";

export type PageType = 'home' | 'inventory' | 'update-inventory';

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
            className={currentPage === 'update-inventory' ? 'active' : ''}
            onClick={() => onPageChange('update-inventory')}
          >
            Actualizar
          </li>
        </ul>
      </nav>
    </header>
  );
};
