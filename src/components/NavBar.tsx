import React from "react";

interface NavBarProps {
  currentPage: 'home' | 'inventory' | 'modify' | 'pos' | 'products';
  onNavigate: (page: 'home' | 'inventory' | 'modify' | 'pos' | 'products') => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentPage, onNavigate }) => {
  return (
    <header className='nav-bar'>
      <div className='brand'>Sample</div>
      <nav>
        <ul>
          <li 
            className={currentPage === 'home' ? 'active' : ''}
            onClick={() => onNavigate('home')}
          >
            Home
          </li>
          <li 
            className={currentPage === 'inventory' ? 'active' : ''}
            onClick={() => onNavigate('inventory')}
          >
            Inventario
          </li>
          <li 
            className={currentPage === 'modify' ? 'active' : ''}
            onClick={() => onNavigate('modify')}
          >
            Modificar Cantidades
          </li>
          <li 
            className={currentPage === 'pos' ? 'active' : ''}
            onClick={() => onNavigate('pos')}
          >
            Punto de Venta
          </li>
          <li 
            className={currentPage === 'products' ? 'active' : ''}
            onClick={() => onNavigate('products')}
          >
            Productos
          </li>
        </ul>
      </nav>
    </header>
  );
};
