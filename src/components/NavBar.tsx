import React from "react";

interface NavBarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
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
        </ul>
      </nav>
    </header>
  );
};
