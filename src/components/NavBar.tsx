import React from "react";

interface NavBarProps {
  currentView: 'home' | 'pos';
  onNavigate: (view: 'home' | 'pos') => void;
}

export const NavBar: React.FC<NavBarProps> = ({ currentView, onNavigate }) => {
  return (
    <header className='nav-bar'>
      <div className='brand'>Sample</div>
      <nav>
        <ul>
          <li 
            className={currentView === 'home' ? 'active' : ''}
            onClick={() => onNavigate('home')}
          >
            Home
          </li>
          <li 
            className={currentView === 'pos' ? 'active' : ''}
            onClick={() => onNavigate('pos')}
          >
            Punto de Venta
          </li>
        </ul>
      </nav>
    </header>
  );
};
