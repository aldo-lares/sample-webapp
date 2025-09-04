import React from "react";

export const NavBar: React.FC = () => {
  return (
    <header className='nav-bar'>
      <div className='brand'>Sample</div>
      <nav>
        <ul>
          <li className='active'>Home</li>
        </ul>
      </nav>
    </header>
  );
};
