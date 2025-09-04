import React from "react";

interface NavBarProps {
  currentPage: 'home' | 'products';
  onNavigate: (page: 'home' | 'products') => void;
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
